import { LineChart, Line } from "recharts";

type MiniSparklineProps = {
  data: { name: number; value: number }[];
  color: string;
};

export function MiniSparkline({ data, color }: MiniSparklineProps) {
  return (
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
}
