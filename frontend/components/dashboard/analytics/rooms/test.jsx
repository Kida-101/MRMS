"use client";

import * as React from "react"
import { TrendingUp } from "lucide-react";
import { Label,Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { label: "Occupied", value: 300, fill:"hsl(var(--chart-completed))" },
  { label: "Vacant", value: 500,fill: "hsl(var(--chart-overdue))"},
];

const totalRooms = chartData.reduce((sum, item) => sum + item.value, 0);

const chartConfig = {
  value: {
    label: "Rooms",
  },
  Occupied: {
    label: "Occupied",
    color: "hsl(var(--chart-completed))",
  },
  Vacant: {
    label: "Vacant",
    color: "hsl(var(--chart-overdue))",
  },
};

export default function RoomPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Room Occupancy</CardTitle>
        <CardDescription>As of April 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
  <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
    <PieChart>
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="label"
        innerRadius={60}
        strokeWidth={5}
      >
        {/* Add this Label component */}
        <Label
          content={({ viewBox }) => {
            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-3xl font-bold"
                  >
                    {totalRooms.toLocaleString()}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) + 24}
                    className="fill-muted-foreground"
                  >
                    Rooms
                  </tspan>
                </text>
              )
            }
          }}
        />
      </Pie>
    </PieChart>
  </ChartContainer>
</CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="mt-2 flex gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-completed))" }} />
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-overdue))" }} />
            <span>Vacant</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 3.4% this month<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Room status overview 
        </div>
      </CardFooter>
    </Card>
  );
}
