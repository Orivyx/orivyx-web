import { Period, MetricSeries, HistoryDataPoint } from "./types";

export const PERIOD_LENGTH: Record<Period, number> = {
  "1h": 24,
  "1w": 7,
  "1m": 12,
};

export const randomArray = (len: number, base: number, spread: number) =>
  Array.from({ length: len }, () => base + Math.random() * spread);

export const clampPct = (v: number) => Math.max(0, Math.min(100, v));

export const generateSimulatedMetrics = (): MetricSeries => ({
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

export const processHistoryData = (data: HistoryDataPoint[]): MetricSeries => {
  const last24h = data.slice(-24);
  const last7d = data
    .slice(-168)
    .filter((_, i) => i % 24 === 0)
    .slice(-7);
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
      "1h": last24h.map((d) => Math.round(d.net_in_mbps * 1000)),
      "1w": last7d.map((d) => Math.round(d.net_in_mbps * 1000)),
      "1m": last12m.map((d) => Math.round(d.net_in_mbps * 1000)),
    },
    netUp: {
      "1h": last24h.map((d) => Math.round(d.net_out_mbps * 1000)),
      "1w": last7d.map((d) => Math.round(d.net_out_mbps * 1000)),
      "1m": last12m.map((d) => Math.round(d.net_out_mbps * 1000)),
    },
  };
};

export const buildHourLabels = (n: number) => {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 3600000);
    return d.getHours().toString().padStart(2, "0") + "h";
  });
};

export const buildDayLabels = (n: number) => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 86400000);
    return days[d.getDay()];
  });
};

export const buildMonthLabels = (n: number) => {
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

export const buildLabelsForPeriod = (p: Period) =>
  p === "1h"
    ? buildHourLabels(PERIOD_LENGTH[p])
    : p === "1w"
    ? buildDayLabels(PERIOD_LENGTH[p])
    : buildMonthLabels(PERIOD_LENGTH[p]);

export const spark = (arr: number[]) =>
  arr.map((v, i) => ({ name: i, value: v }));
