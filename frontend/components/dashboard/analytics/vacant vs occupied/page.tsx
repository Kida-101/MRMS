"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "January", vacant: 186, occupied: 80 },
  { month: "February", vacant: 305, occupied: 200 },
  { month: "March", vacant: 237, occupied: 120 },
  { month: "April", vacant: 73, occupied: 190 },
  { month: "May", vacant: 209, occupied: 130 },
  { month: "June", vacant: 214, occupied: 140 },
]

const chartConfig = {
  vacant: {
    label: "Vacant",
    color: "hsl(var(--chart-tenant))",
  },
  occupied: {
    label: "Occupied",
    color: "hsl(var(--chart-vacoccu))",
  },
} satisfies ChartConfig

export default function VacantVsOccupied() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacant vs Occupied</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="vacant" fill="var(--color-vacant)" radius={4} />
            <Bar dataKey="occupied" fill="var(--color-occupied)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none mt-2 ml-auto mr-auto">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground mb-9">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
