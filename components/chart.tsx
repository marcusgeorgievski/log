"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardTitle } from "./ui/card";
import { useState } from "react";

let chartData = [
  // July 2025
  { date: "July 4 2025", UDS: 10 },
];

const chartConfig = {
  DDIA: {
    label: "DDIA",
    color: "#2563eb",
  },
  OSTEP: {
    label: "OSTEP",
    color: "#60a5fa",
  },
  UDS: {
    label: "UDS",
    color: "#30a5fa",
  },
} satisfies ChartConfig;

type TimeFilter = "week" | "month" | "year";

function TimeFilterButtons({
  selectedFilter,
  onFilterChange,
}: {
  selectedFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}) {
  const filters = [
    { key: "week" as TimeFilter, label: "Past Week" },
    { key: "month" as TimeFilter, label: "Past Month" },
    { key: "year" as TimeFilter, label: "Past Year" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`text-sm border rounded-md px-2 py-1 hover:cursor-pointer ${
            selectedFilter === key
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function filterDataByTimeRange(data: any[], filter: TimeFilter) {
  if (!data || data.length === 0) return data;

  const now = new Date();
  const cutoffDate = new Date(now);

  switch (filter) {
    case "week":
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case "month":
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case "year":
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  return data.filter((item) => {
    try {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    } catch (e) {
      console.error("Error parsing date:", item.date);
      return true; // Include item if date parsing fails
    }
  });
}

export default function Chart() {
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>("month");
  const [filteredData, setFilteredData] = useState(() =>
    filterDataByTimeRange(chartData, "month")
  );

  const handleFilterChange = (filter: TimeFilter) => {
    setSelectedFilter(filter);
    setFilteredData(filterDataByTimeRange(chartData, filter));
  };

  return (
    <div className="flex flex-col gap-4">
      <TimeFilterButtons
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full max-h-[400px]"
      >
        <BarChart
          accessibilityLayer
          data={filteredData}
          stackOffset="sign"
          reverseStackOrder={true}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="DDIA" fill="var(--color-DDIA)" radius={0} stackId="a" />
          <Bar
            dataKey="OSTEP"
            fill="var(--color-OSTEP)"
            radius={0}
            stackId="a"
          />
          <Bar dataKey="UDS" fill="var(--color-UDS)" radius={0} stackId="a" />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
