import { useState, useEffect } from "react";

type RealtimeMetrics = {
  cpu: number;
  ram: number;
  disk: number;
  net: number;
  ping: number;
  history: {
    cpu: number[];
    ram: number[];
    disk: number[];
    net: number[];
    ping: number[];
  };
};

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<RealtimeMetrics>({
    cpu: 0,
    ram: 0,
    disk: 0,
    net: 0,
    ping: 0,
    history: {
      cpu: [],
      ram: [],
      disk: [],
      net: [],
      ping: [],
    },
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_MONITOR_API_URL}`, {
          headers: {
            Authorization: `Basic ${import.meta.env.VITE_MONITOR_API_KEY}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          console.warn("API error:", res.status);
          return;
        }

        const data = await res.json();

        const cpu = Math.round(data.cpu_percent);
        const ram = Math.round(data.ram_percent);
        const disk = Math.max(0, Math.round(data.disk_percent));
        const net = Math.round((data.net_in_mbps + data.net_out_mbps) * 1000);
        const ping = Math.round(data.ping_ms);

        setMetrics((prev) => ({
          cpu,
          ram,
          disk,
          net,
          ping,
          history: {
            cpu: [...prev.history.cpu.slice(-59), cpu],
            ram: [...prev.history.ram.slice(-59), ram],
            disk: [...prev.history.disk.slice(-59), disk],
            net: [...prev.history.net.slice(-59), net],
            ping: [...prev.history.ping.slice(-59), ping],
          },
        }));
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
