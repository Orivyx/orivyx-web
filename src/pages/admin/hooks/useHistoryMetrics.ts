import { useState, useEffect } from "react";
import { MetricSeries, HistoryResponse } from "../types";
import { generateSimulatedMetrics, processHistoryData } from "../utils";

export function useHistoryMetrics() {
  const [metrics, setMetrics] = useState<MetricSeries>(
    generateSimulatedMetrics
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_MONITOR_API_URL?.replace(
            "/realtime",
            "/history"
          )}`,
          {
            headers: {
              Authorization: `Basic ${import.meta.env.VITE_MONITOR_API_KEY}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          console.warn("History API error:", res.status);
          return;
        }

        const data: HistoryResponse = await res.json();

        if (data && Array.isArray(data) && data.length > 0) {
          const processedMetrics = processHistoryData(data);
          setMetrics(processedMetrics);
        } else {
          console.info("History API returned no data, using simulated data");
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();

    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchHistory, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { metrics, loading };
}
