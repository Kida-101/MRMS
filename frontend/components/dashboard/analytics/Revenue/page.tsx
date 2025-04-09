"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {DollarSign} from "lucide-react"

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
  { month: "January", Revenue: 186},
  { month: "February", Revenue: 305},
  { month: "March", Revenue: 237},
  { month: "April", Revenue: 73},
  { month: "May", Revenue: 209 },
  { month: "June", Revenue: 214},
]

const chartConfig = {
  Revenue: {
    color: "hsl(var(--chart-revenue))",
  },

} satisfies ChartConfig

export default function Revenue() {
  return (
    <Card>
      <CardHeader >
        <CardTitle >Total Revenue</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
        <CardTitle className="mt-3 mb-2 flex gap-1"><DollarSign className="mt-1"/><h2 className='align-middle text-2xl'>2500</h2></CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="Revenue"
              type="monotone"
              stroke="hsl(var(--chart-revenue))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-revenue))",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none ml-auto mr-auto">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
