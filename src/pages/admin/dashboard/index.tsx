"use client";

import { useState } from "react";
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
} from "../components/ui/chart";

import { Period } from "../types";
import { buildLabelsForPeriod, spark } from "../utils";
import { MiniCard, ChartWrapper } from "../components";
import { useRealtimeMetrics, useHistoryMetrics } from "../hooks";

export function Dashboard() {
  const [cpuPeriod, setCpuPeriod] = useState<Period>("1h");
  const [ramPeriod, setRamPeriod] = useState<Period>("1h");
  const [diskPeriod, setDiskPeriod] = useState<Period>("1h");
  const [netPeriod, setNetPeriod] = useState<Period>("1h");

  const realtime = useRealtimeMetrics();
  const { metrics } = useHistoryMetrics();

  const labelsCPU = buildLabelsForPeriod(cpuPeriod);
  const labelsRAM = buildLabelsForPeriod(ramPeriod);
  const labelsDISK = buildLabelsForPeriod(diskPeriod);
  const labelsNET = buildLabelsForPeriod(netPeriod);

  const cpuData = labelsCPU.map((n, i) => ({
    name: n,
    cpu: Math.round(metrics.cpu[cpuPeriod][i] || 0),
  }));

  const ramData = labelsRAM.map((n, i) => ({
    name: n,
    used: Math.round(metrics.ramUsed[ramPeriod][i] || 0),
    cache: Math.round(metrics.ramCache[ramPeriod][i] || 0),
  }));

  const diskData = labelsDISK.map((n, i) => ({
    name: n,
    read: Math.round(metrics.diskRead[diskPeriod][i] || 0),
    write: Math.round(metrics.diskWrite[diskPeriod][i] || 0),
  }));

  const netData = labelsNET.map((n, i) => ({
    name: n,
    download: Math.round(metrics.netDown[netPeriod][i] || 0),
    upload: Math.round(metrics.netUp[netPeriod][i] || 0),
  }));

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 tracking-tight">VPS Monitor</h1>

      {/* MINI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MiniCard
          title="CPU"
          value={`${realtime.cpu}%`}
          accent="#FF2D7F"
          chartData={spark(realtime.history.cpu)}
          variant="pink"
        />

        <MiniCard
          title="RAM"
          value={`${realtime.ram}%`}
          accent="#A873FF"
          chartData={spark(realtime.history.ram)}
          variant="neutral"
        />

        <MiniCard
          title="Disk"
          value={`${realtime.disk}%`}
          accent="#FF2D7F"
          chartData={spark(realtime.history.disk)}
          variant="white"
        />

        <MiniCard
          title="Network"
          value={`${realtime.net} kbps`}
          accent="#00E7FF"
          chartData={spark(realtime.history.net)}
          variant="pink"
        />

        <MiniCard
          title="Ping"
          value={`${realtime.ping} ms`}
          accent="#A873FF"
          chartData={spark(realtime.history.ping)}
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
    </>
  );
}
