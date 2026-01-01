export type Period = "1h" | "1w" | "1m";

export type MetricSeries = {
  cpu: Record<Period, number[]>;
  ramUsed: Record<Period, number[]>;
  ramCache: Record<Period, number[]>;
  diskRead: Record<Period, number[]>;
  diskWrite: Record<Period, number[]>;
  netDown: Record<Period, number[]>;
  netUp: Record<Period, number[]>;
};

export type HistoryDataPoint = {
  timestamp: string;
  cpu_percent: number;
  ram_percent: number;
  disk_percent: number;
  disk_read_mbps: number;
  disk_write_mbps: number;
  net_in_mbps: number;
  net_out_mbps: number;
};

export type HistoryResponse = HistoryDataPoint[] | null;

export type RealtimeData = {
  cpu_percent: number;
  ram_percent: number;
  disk_percent: number;
  net_in_mbps: number;
  net_out_mbps: number;
  ping_ms: number;
};
