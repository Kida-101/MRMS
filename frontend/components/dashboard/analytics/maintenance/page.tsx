"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "resolved", visitors: 200 /*get from backend*/, fill: "var(--color-completed)"},// Green
    { browser: "overdue", visitors: 275/*get from backend*/, fill: "var(--color-overdue)" }, // Red
    { browser: "waiting", visitors: 200/*get from backend*/, fill: "var(--color-pending)" }, // Yellow 
]

const chartConfig = {
    visitors: {
        label: "Payments",
      },
      completed: {
        label: "Completed",
        color: "hsl(var(--chart-completed))", // Green
      },
      pending: {
        label: "Waiting",
        color: "hsl(var(--chart-pending))", // Yellow
      },
      overdue: {
        label: "Overdue",
        color: "hsl(var(--chart-overdue))", // Red
      },
  } satisfies ChartConfig

export default function Maintenance() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
      }, [])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 -mb-10">
        <CardTitle>Maintenance Information</CardTitle>
        <CardDescription>January - June 2024</CardDescription>{/* get data from the backend */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
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
                                      {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground "
                                    >
                                    Total Request
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
      <div className="flex items-center gap-2 -mt-7">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-completed))" }} />
            <span>Resolved</span>
            <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-pending))" }} />
                <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-overdue))" }} />
            <span>Over Due</span>
        </div>
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />{/* get data from the backend */}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months {/* get data from the backend */}
        </div>
      </CardFooter>
    </Card>
  )
}
