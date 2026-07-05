"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
  labels: string[];
  values: number[];
  colors: string[];
  totalLabel?: string;
  className?: string;
};

export function DonutChart({ title, labels, values, colors, totalLabel = "총", className = "" }: Props) {
  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <section className={["rounded-lg border border-line bg-white p-4 shadow-sm", className].join(" ")}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-ink">{title}</h2>
        <span className="text-sm text-slate-600">
          {totalLabel} {total}
        </span>
      </div>
      <div className="mx-auto h-56 max-w-72">
        <Doughnut
          data={{
            labels,
            datasets: [{ data: values, backgroundColor: colors, borderColor: "#FFFFFF", borderWidth: 3 }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom", labels: { boxWidth: 12, padding: 14 } }
            },
            cutout: "62%"
          }}
        />
      </div>
    </section>
  );
}
