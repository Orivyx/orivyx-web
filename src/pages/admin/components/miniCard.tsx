import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MiniSparkline } from "./miniSparkline";

const miniStyles = {
  pink: "bg-pink/5 border border-pink text-white",
  white: "bg-white border border-pink text-pink",
  neutral: "bg-white/5 border border-white/20 text-white",
} as const;

export type MiniCardVariant = keyof typeof miniStyles;

type MiniCardProps = {
  title: string;
  value: string;
  accent: string;
  chartData: { name: number; value: number }[];
  variant: MiniCardVariant;
};

export function MiniCard({
  title,
  value,
  accent,
  chartData,
  variant,
}: MiniCardProps) {
  return (
    <Card
      className={\`\${miniStyles[variant]} rounded-2xl backdrop-blur-lg transition-transform duration-300 hover:scale-105\`}
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
