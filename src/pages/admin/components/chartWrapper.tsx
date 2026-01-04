import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { PeriodSelector } from "./periodSelector";
import { Period } from "../types";

const bigPink =
  "rounded-xl lg:rounded-2xl bg-pink/5 border border-pink backdrop-blur-lg p-3 lg:p-6 text-white hover:scale-[1.01]";
const bigNeutral =
  "rounded-xl lg:rounded-2xl bg-white/5 border border-white/20 backdrop-blur-lg p-3 lg:p-6 text-white hover:scale-[1.01]";
const bigWhite =
  "rounded-xl lg:rounded-2xl bg-white border border-pink backdrop-blur-lg p-3 lg:p-6 text-pink hover:scale-[1.01]";

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
      <CardHeader className="p-0 pb-2 lg:pb-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <CardTitle className="text-base lg:text-xl font-onest">{title}</CardTitle>

          <PeriodSelector
            value={period}
            onChange={setPeriod}
            variant={variant === "white" ? "white" : "dark"}
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
