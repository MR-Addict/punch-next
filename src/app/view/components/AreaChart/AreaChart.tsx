"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useClientContext } from "../../contexts";
import { formatDate, groupBy } from "@/lib/utils";

Chart.register(...registerables);

const LineOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: { grid: { color: "#6b728040" } },
    x: { grid: { color: "#6b728040" } },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      color: "#d1d5db",
      text: "每日提交",
      font: { size: 21 },
    },
    datalabels: {
      align: "top",
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
            weight: "bold",
          },
        },
      },
    },
  },
};

export default function AreaChart() {
  const { notes } = useClientContext();

  const groupedNotes = useMemo(() => groupBy([...notes].reverse(), (note) => formatDate(note.date)), [notes]);
  const data = useMemo(() => groupedNotes.map((item) => item.count), [groupedNotes]);
  const labels = useMemo(() => {
    return groupedNotes.map((item) => {
      const [month, day] = item.category.slice(5).split("-");
      return Number(month) + "." + Number(day);
    });
  }, [groupedNotes]);

  return (
    <div className='w-full overflow-x-auto bg-dark rounded-xl p-5'>
      <div className='w-full min-w-[600px] h-[300px] md:h-[500px]'>
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
                backgroundColor: "#0ea5e980",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
