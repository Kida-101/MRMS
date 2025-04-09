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
  { month: "January", tenant: 186 },
  { month: "February", tenant: 305 },
  { month: "March", tenant: 237 },
  { month: "April", tenant: 73 },
  { month: "May", tenant: 209 },
  { month: "June", tenant: 214 },
]

const chartConfig = {
  tenant: {
    color: "hsl(var(--chart-tenant))",
  },
} satisfies ChartConfig

export default function NumberOfTenant() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of tenant information</CardTitle>
        <CardDescription className="mb-5">January - June 2024</CardDescription>
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tenant" fill="var(--color-tenant)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none ml-auto mr-auto">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground mb-8">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
