"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
    { browser: "overdue", visitors: 200 /*get from backend*/, fill: "var(--color-overdue)"},
    { browser: "completed", visitors: 275/*get from backend*/, fill: "var(--color-completed)" }, // Green
    { browser: "pending", visitors: 200/*get from backend*/, fill: "var(--color-pending)" }, // Yellow // Red
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
        label: "Pending",
        color: "hsl(var(--chart-pending))", // Yellow
      },
      overdue: {
        label: "Overdue",
        color: "hsl(var(--chart-overdue))", // Red
      },
  } satisfies ChartConfig

export default function PaymentInformation() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 -mb-10">
        <CardTitle>Payment Information</CardTitle>
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
                          className="fill-muted-foreground"
                        >
                        Expected Income
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
        <div className="flex items-center gap-2 -mt-7">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-completed))" }} />
            <span>Completed</span>
            <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-pending))" }} />
                <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-overdue))" }} />
            <span>Over Due</span>
        </div>
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
