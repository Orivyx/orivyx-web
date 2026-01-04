import { Period } from "../types";

type PeriodSelectorProps = {
  value: Period;
  onChange: (period: Period) => void;
  variant?: "dark" | "white";
};

const options: { id: Period; label: string }[] = [
  { id: "1h", label: "Horas" },
  { id: "1w", label: "Semanas" },
  { id: "1m", label: "Meses" },
];

export function PeriodSelector({
  value,
  onChange,
  variant = "dark",
}: PeriodSelectorProps) {
  return (
    <div className="flex gap-1 lg:gap-2">
      {options.map((o) => {
        const selected = value === o.id;
        const common = `px-2 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transition border`;

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
