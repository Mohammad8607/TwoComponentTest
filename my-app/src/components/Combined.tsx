"use client"

import * as React from 'react';
import { Payment, columns } from './DataTableDemo';
import { DataTableDemo } from './DataTableDemo';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
 } from './ui/card';
 import { 
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
 } from './ui/chart';
 import { PieChart, Pie, Label, Sector } from 'recharts';
 import data from '@/data/Data.json'

 const chartConfig = {
  success: {
    label: "Success",
    color: "green",
  }, 
  failed: {
    label: "Failed",
    color: "red",
  },
  processing: {
    label: "Processing",
    color: "yellow",
  },
  pending: {
    label: "Pending",
    color: "orange",
  },
 }

 const id = "pie-interactive"

 export default function Combined() {
  const [filteredData, setFilteredData] = React.useState<Payment[]>(data.paymentTableData)

  const pieData = React.useMemo(() => {
    const grouped: Record<string, number> = {}

    filteredData.forEach((item) => {
      grouped[item.status] = (grouped[item.status] || 0) + 1
    })

    return Object.entries(grouped).map(([status, count]) => ({
      name: status,
      value: count,
      fill: chartConfig[status as keyof typeof chartConfig]?.color || "#8884d8",
    }))
  }, [filteredData])

  return (
    <div className="grid grid-cols-1 -2 gap-6">
      <div>
        <DataTableDemo
        data={data.paymentTableData}
        onFilteredChange={setFilteredData}
        />
      </div>

      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Pie Chart - Filtered</CardTitle>
            <CardDescription>Based on filtered data</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip 
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              />
              <Pie 
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={-1}
              activeShape={(props) => {
                const { outerRadius = 0 } = props
                return (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector 
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                    />
                  </g>
                )
              }}
              >
                <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const total = pieData.reduce((sum, d) => sum + d.value, 0)
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
                        className="fill-muted-foreground"
                        >
                          Payments
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
      </Card>
    </div>
  )
 }