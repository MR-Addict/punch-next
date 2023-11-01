"use client";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);

const LineOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: { grid: { color: "#6b728040" }, beginAtZero: true },
    x: { grid: { color: "#6b728040" } }
  },
  plugins: {
    legend: { display: false },
    title: { display: false },
    datalabels: {
      align: "middle",
      anchor: "top",
      color: "#d1d5db",
      formatter: (value: any, context: { dataset: { data: any[] } }) => {
        const dataPoints = context.dataset.data;
        const sum = parseInt(dataPoints.reduce((prop, a) => prop + a, 0));
        return sum ? `${value}` : "error";
      },
      labels: {
        title: {
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    }
  }
};

export default function AreaChart({ title, data, labels }: { title: string; data: any[]; labels: any[] }) {
  return (
    <div className="bg-dark rounded-xl p-5 flex flex-col items-center gap-3">
      <h1 className="font-semibold text-lg">{title}</h1>
      <div className="flex-1 w-full overflow-x-auto">
        <div className="w-full min-w-[600px] md:min-w-full h-[300px] md:h-full">
          <Line
            // @ts-expect-error
            options={LineOptions}
            plugins={[ChartDataLabels]}
            data={{
              labels,
              datasets: [
                {
                  data,
                  fill: true,
                  tension: 0.4,
                  label: "LineChart",
                  borderColor: "#0ea5e9a0",
                  backgroundColor: "#0ea5e980"
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
}
