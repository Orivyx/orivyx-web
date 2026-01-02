import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { PeriodSelector } from "./periodSelector";
import { Period } from "../types";

const bigPink =
  "rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg p-6 text-white hover:scale-[1.01]";
const bigNeutral =
  "rounded-2xl bg-white/5 border border-white/20 backdrop-blur-lg p-6 text-white hover:scale-[1.01]";
const bigWhite =
  "rounded-2xl bg-white border border-pink backdrop-blur-lg p-6 text-pink hover:scale-[1.01]";

type ChartWrapperVariant = "pink" | "neutral" | "white";

type ChartWrapperProps = {
  title: string;
  period: Period;
  setPeriod: (period: Period) => void;
  variant: ChartWrapperVariant;
  children: ReactNode;
};

export function ChartWrapper({
  title,
  period,
  setPeriod,
  variant,
  children,
}: ChartWrapperProps) {
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
