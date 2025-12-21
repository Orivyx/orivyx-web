"use client";

import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* ---------------------------------------------
   TYPES
--------------------------------------------- */

type Period = "1h" | "1w" | "1m";

type MetricSeries = {
  cpu: Record<Period, number[]>;
  ramUsed: Record<Period, number[]>;
  ramCache: Record<Period, number[]>;
  diskRead: Record<Period, number[]>;
  diskWrite: Record<Period, number[]>;
  netDown: Record<Period, number[]>;
  netUp: Record<Period, number[]>;
};

// Tipo esperado da API /monitor/history
type HistoryDataPoint = {
  timestamp: string;
  cpu_percent: number;
  ram_percent: number;
  disk_percent: number;
  disk_read_mbps: number;
  disk_write_mbps: number;
  net_in_mbps: number;
  net_out_mbps: number;
};

type HistoryResponse = HistoryDataPoint[] | null;

/* ---------------------------------------------
   UTILS
--------------------------------------------- */

const PERIOD_LENGTH: Record<Period, number> = {
  "1h": 24,
  "1w": 7,
  "1m": 12,
};

const randomArray = (len: number, base: number, spread: number) =>
  Array.from({ length: len }, () => base + Math.random() * spread);

const clampPct = (v: number) => Math.max(0, Math.min(100, v));

// Gera dados simulados (fallback quando API não disponível)
const generateSimulatedMetrics = (): MetricSeries => ({
  cpu: {
    "1h": randomArray(24, 30, 60),
    "1w": randomArray(7, 30, 60),
    "1m": randomArray(12, 30, 60),
  },
  ramUsed: {
    "1h": randomArray(24, 40, 40),
    "1w": randomArray(7, 40, 40),
    "1m": randomArray(12, 40, 40),
  },
  ramCache: {
    "1h": randomArray(24, 15, 20),
    "1w": randomArray(7, 15, 20),
    "1m": randomArray(12, 15, 20),
  },
  diskRead: {
    "1h": randomArray(24, 50, 150),
    "1w": randomArray(7, 50, 150),
    "1m": randomArray(12, 50, 150),
  },
  diskWrite: {
    "1h": randomArray(24, 20, 100),
    "1w": randomArray(7, 20, 100),
    "1m": randomArray(12, 20, 100),
  },
  netDown: {
    "1h": randomArray(24, 80, 160),
    "1w": randomArray(7, 80, 160),
    "1m": randomArray(12, 80, 160),
  },
  netUp: {
    "1h": randomArray(24, 30, 80),
    "1w": randomArray(7, 30, 80),
    "1m": randomArray(12, 30, 80),
  },
});

// Processa dados da API para o formato dos gráficos
const processHistoryData = (data: HistoryDataPoint[]): MetricSeries => {
  // Agrupa dados por período (últimas 24h, 7 dias, 12 meses)
  const now = new Date();

  // Filtra dados das últimas 24 horas (1 ponto por hora)
  const last24h = data.slice(-24);
  // Filtra dados dos últimos 7 dias (1 ponto por dia)
  const last7d = data
    .slice(-168)
    .filter((_, i) => i % 24 === 0)
    .slice(-7);
  // Filtra dados dos últimos 12 meses (1 ponto por mês)
  const last12m = data
    .slice(-8760)
    .filter((_, i) => i % 720 === 0)
    .slice(-12);

  const extractMetric = (
    arr: HistoryDataPoint[],
    key: keyof HistoryDataPoint
  ) => arr.map((d) => Math.round(Number(d[key]) || 0));

  return {
    cpu: {
      "1h": extractMetric(last24h, "cpu_percent"),
      "1w": extractMetric(last7d, "cpu_percent"),
      "1m": extractMetric(last12m, "cpu_percent"),
    },
    ramUsed: {
      "1h": extractMetric(last24h, "ram_percent"),
      "1w": extractMetric(last7d, "ram_percent"),
      "1m": extractMetric(last12m, "ram_percent"),
    },
    ramCache: {
      // API não tem cache separado, usa 20% do ram como estimativa
      "1h": last24h.map((d) => Math.round(d.ram_percent * 0.2)),
      "1w": last7d.map((d) => Math.round(d.ram_percent * 0.2)),
      "1m": last12m.map((d) => Math.round(d.ram_percent * 0.2)),
    },
    diskRead: {
      "1h": extractMetric(last24h, "disk_read_mbps"),
      "1w": extractMetric(last7d, "disk_read_mbps"),
      "1m": extractMetric(last12m, "disk_read_mbps"),
    },
    diskWrite: {
      "1h": extractMetric(last24h, "disk_write_mbps"),
      "1w": extractMetric(last7d, "disk_write_mbps"),
      "1m": extractMetric(last12m, "disk_write_mbps"),
    },
    netDown: {
      "1h": last24h.map((d) => Math.round(d.net_in_mbps * 1000)), // Converte para kbps
      "1w": last7d.map((d) => Math.round(d.net_in_mbps * 1000)),
      "1m": last12m.map((d) => Math.round(d.net_in_mbps * 1000)),
    },
    netUp: {
      "1h": last24h.map((d) => Math.round(d.net_out_mbps * 1000)), // Converte para kbps
      "1w": last7d.map((d) => Math.round(d.net_out_mbps * 1000)),
      "1m": last12m.map((d) => Math.round(d.net_out_mbps * 1000)),
    },
  };
};

/* ---------------------------------------------
   PERIOD SELECTOR
--------------------------------------------- */

function PeriodSelector({ value, onChange, variant = "dark" }: any) {
  const opts = [
    { id: "1h", label: "Horas" },
    { id: "1w", label: "Semanas" },
    { id: "1m", label: "Meses" },
  ];

  return (
    <div className="flex gap-2">
      {opts.map((o) => {
        const selected = value === o.id;

        const common = `px-4 py-1.5 rounded-full text-sm font-medium transition border`;

        if (variant === "white") {
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={`${common} ${
                selected
                  ? "bg-pink text-white border-pink"
                  : "bg-black/10 text-black/70 border-black/20 hover:bg-black/20"
              }`}
            >
              {o.label}
            </button>
          );
        }

        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`${common} ${
              selected
                ? "bg-pink text-white border-pink"
                : "bg-white/5 text-white/80 border-white/20 hover:bg-white/10"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------
   MINI SPARKLINE
--------------------------------------------- */

const MiniSparkline = ({ data, color }: any) => (
  <div className="w-full h-10 overflow-hidden">
    <LineChart width={120} height={40} data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  </div>
);

/* ---------------------------------------------
   MINI CARD
--------------------------------------------- */

const miniStyles = {
  pink: "bg-pink/5 border border-pink text-white",
  white: "bg-white border border-pink text-pink",
  neutral: "bg-white/5 border border-white/20 text-white",
} as const;

type MiniCardVariant = keyof typeof miniStyles;

type MiniCardProps = {
  title: string;
  value: string;
  accent: string;
  chartData: { name: number; value: number }[];
  variant: MiniCardVariant;
};

function MiniCard({ title, value, accent, chartData, variant }: MiniCardProps) {
  return (
    <Card
      className={`${miniStyles[variant]} rounded-2xl backdrop-blur-lg transition-transform duration-300 hover:scale-105`}
    >
      <CardHeader className="pb-1">
        <CardTitle className="text-base font-onest tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold mb-2" style={{ color: accent }}>
          {value}
        </div>

        <MiniSparkline data={chartData} color={accent} />
      </CardContent>
    </Card>
  );
}

/* ---------------------------------------------
   CARD THEMES
--------------------------------------------- */

const bigPink =
  "rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg p-6 text-white hover:scale-[1.01]";
const bigNeutral =
  "rounded-2xl bg-white/5 border border-white/20 backdrop-blur-lg p-6 text-white hover:scale-[1.01]";
const bigWhite =
  "rounded-2xl bg-white border border-pink backdrop-blur-lg p-6 text-pink hover:scale-[1.01]";

/* ---------------------------------------------
   LABEL BUILDERS
--------------------------------------------- */

const buildHourLabels = (n: number) => {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 3600000);
    return d.getHours().toString().padStart(2, "0") + "h";
  });
};

const buildDayLabels = (n: number) => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 86400000);
    return days[d.getDay()];
  });
};

const buildMonthLabels = (n: number) => {
  const now = new Date();
  const m = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (n - 1 - i), 1);
    return m[d.getMonth()];
  });
};

const buildLabelsForPeriod = (p: Period) =>
  p === "1h"
    ? buildHourLabels(PERIOD_LENGTH[p])
    : p === "1w"
    ? buildDayLabels(PERIOD_LENGTH[p])
    : buildMonthLabels(PERIOD_LENGTH[p]);

/* ---------------------------------------------
   WRAPPER
--------------------------------------------- */

function ChartWrapper({ title, period, setPeriod, variant, children }: any) {
  const theme =
    variant === "white"
      ? bigWhite
      : variant === "neutral"
      ? bigNeutral
      : bigPink;

  return (
    <Card className={theme}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-onest">{title}</CardTitle>

          <PeriodSelector
            value={period}
            onChange={setPeriod}
            variant={variant === "white" ? "white" : "dark"}
          />
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}

/* ---------------------------------------------
   MAIN
--------------------------------------------- */

export default function Admin() {
  /* Period states */
  const [cpuPeriod, setCpuPeriod] = React.useState<Period>("1h");
  const [ramPeriod, setRamPeriod] = React.useState<Period>("1h");
  const [diskPeriod, setDiskPeriod] = React.useState<Period>("1h");
  const [netPeriod, setNetPeriod] = React.useState<Period>("1h");

  /* Metrics for big charts - starts with simulated, updates from API */
  const [metrics, setMetrics] = React.useState<MetricSeries>(
    generateSimulatedMetrics
  );
  const [historyLoading, setHistoryLoading] = React.useState(true);

  /* Fetch history data from API */
  React.useEffect(() => {
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
        setHistoryLoading(false);
      }
    }

    fetchHistory();

    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchHistory, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------------------------------------
     REALTIME MINI-CARDS (API REAL)
  --------------------------------------------- */

  const [miniCpu, setMiniCpu] = React.useState(0);
  const [miniRam, setMiniRam] = React.useState(0);
  const [miniDisk, setMiniDisk] = React.useState(0);
  const [miniNet, setMiniNet] = React.useState(0);
  const [miniPing, setMiniPing] = React.useState(0);

  const [sCpu, setSCpu] = React.useState<number[]>([]);
  const [sRam, setSRam] = React.useState<number[]>([]);
  const [sDisk, setSDisk] = React.useState<number[]>([]);
  const [sNet, setSNet] = React.useState<number[]>([]);
  const [sPing, setSPing] = React.useState<number[]>([]);

  React.useEffect(() => {
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

        setMiniCpu(cpu);
        setMiniRam(ram);
        setMiniDisk(disk);
        setMiniNet(net);
        setMiniPing(ping);

        setSCpu((s) => [...s.slice(-59), cpu]);
        setSRam((s) => [...s.slice(-59), ram]);
        setSDisk((s) => [...s.slice(-59), disk]);
        setSNet((s) => [...s.slice(-59), net]);
        setSPing((s) => [...s.slice(-59), ping]);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------------------------------------
     BIG CHART DATA
  --------------------------------------------- */

  const labelsCPU = buildLabelsForPeriod(cpuPeriod);
  const labelsRAM = buildLabelsForPeriod(ramPeriod);
  const labelsDISK = buildLabelsForPeriod(diskPeriod);
  const labelsNET = buildLabelsForPeriod(netPeriod);

  const cpuData = labelsCPU.map((n, i) => ({
    name: n,
    cpu: Math.round(metrics.cpu[cpuPeriod][i]),
  }));

  const ramData = labelsRAM.map((n, i) => ({
    name: n,
    used: Math.round(metrics.ramUsed[ramPeriod][i]),
    cache: Math.round(metrics.ramCache[ramPeriod][i]),
  }));

  const diskData = labelsDISK.map((n, i) => ({
    name: n,
    read: Math.round(metrics.diskRead[diskPeriod][i]),
    write: Math.round(metrics.diskWrite[diskPeriod][i]),
  }));

  const netData = labelsNET.map((n, i) => ({
    name: n,
    download: Math.round(metrics.netDown[netPeriod][i]),
    upload: Math.round(metrics.netUp[netPeriod][i]),
  }));

  const spark = (arr: number[]) => arr.map((v, i) => ({ name: i, value: v }));

  /* ---------------------------------------------
     UI
  --------------------------------------------- */

  return (
    <div
      className="flex min-h-screen w-full text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-admin.png')" }}
    >
      {/* SIDEBAR */}
      <aside className="w-[20%] h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto font-onest">
        <img src="/logo.png" className="w-24 h-auto mb-10" />

        <nav className="space-y-4 text-xl">
          <a className="block text-white/80 hover:text-pink transition">
            Dashboard
          </a>
          <a className="block text-white/80 hover:text-pink transition">
            VPS Monitor
          </a>
          <a className="block text-white/80 hover:text-pink transition">
            Network
          </a>
          <a className="block text-white/80 hover:text-pink transition">
            Security
          </a>
          <a className="block text-white/80 hover:text-pink transition">
            Settings
          </a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="ml-[20%] w-[80%] p-8 font-onest">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">VPS Monitor</h1>

        {/* MINI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <MiniCard
            title="CPU"
            value={`${miniCpu}%`}
            accent="#FF2D7F"
            chartData={spark(sCpu)}
            variant="pink"
          />

          <MiniCard
            title="RAM"
            value={`${miniRam}%`}
            accent="#A873FF"
            chartData={spark(sRam)}
            variant="neutral"
          />

          <MiniCard
            title="Disk"
            value={`${miniDisk}%`}
            accent="#FF2D7F"
            chartData={spark(sDisk)}
            variant="white"
          />

          <MiniCard
            title="Network"
            value={`${miniNet} kbps`}
            accent="#00E7FF"
            chartData={spark(sNet)}
            variant="pink"
          />

          <MiniCard
            title="Ping"
            value={`${miniPing} ms`}
            accent="#A873FF"
            chartData={spark(sPing)}
            variant="neutral"
          />
        </div>

        {/* BIG CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* CPU */}
          <ChartWrapper
            title="CPU Usage"
            period={cpuPeriod}
            setPeriod={setCpuPeriod}
            variant="pink"
          >
            <ChartContainer
              className="w-full h-[260px]"
              config={{ cpu: { label: "CPU (%)", color: "#FF2D7F" } }}
            >
              <LineChart data={cpuData}>
                <CartesianGrid
                  stroke="#ffffff"
                  strokeOpacity={0.1}
                  vertical={false}
                />
                <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="cpu"
                  stroke="#FF2D7F"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </ChartWrapper>

          {/* RAM */}
          <ChartWrapper
            title="RAM Usage"
            period={ramPeriod}
            setPeriod={setRamPeriod}
            variant="neutral"
          >
            <ChartContainer
              className="w-full h-[260px]"
              config={{
                used: { label: "Used", color: "#A873FF" },
                cache: { label: "Cache", color: "#00E7FF" },
              }}
            >
              <AreaChart data={ramData}>
                <CartesianGrid strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="used"
                  stroke="#A873FF"
                  fill="#A873FF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Area
                  dataKey="cache"
                  stroke="#00E7FF"
                  fill="#00E7FF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </ChartWrapper>

          {/* DISK */}
          <ChartWrapper
            title="Disk I/O"
            period={diskPeriod}
            setPeriod={setDiskPeriod}
            variant="white"
          >
            <ChartContainer
              className="w-full h-[260px]"
              config={{
                read: { label: "Read", color: "#00E7FF" },
                write: { label: "Write", color: "#FF2D7F" },
              }}
            >
              <BarChart data={diskData}>
                <CartesianGrid
                  stroke="#000"
                  strokeOpacity={0.1}
                  vertical={false}
                />
                <XAxis dataKey="name" tick={{ fill: "#444" }} />
                <YAxis tick={{ fill: "#444" }} />
                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar dataKey="read" fill="#00E7FF" radius={[6, 6, 0, 0]} />
                <Bar dataKey="write" fill="#FF2D7F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartWrapper>

          {/* NETWORK */}
          <ChartWrapper
            title="Network Traffic"
            period={netPeriod}
            setPeriod={setNetPeriod}
            variant="pink"
          >
            <ChartContainer
              className="w-full h-[260px]"
              config={{
                download: { label: "Download", color: "#00E7FF" },
                upload: { label: "Upload", color: "#FF2D7F" },
              }}
            >
              <AreaChart data={netData}>
                <CartesianGrid strokeOpacity={0.05} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="download"
                  stroke="#00E7FF"
                  fill="#00E7FF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Area
                  dataKey="upload"
                  stroke="#FF2D7F"
                  fill="#FF2D7F"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </ChartWrapper>
        </div>
      </main>
    </div>
  );
}
