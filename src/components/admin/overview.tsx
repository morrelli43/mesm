"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useApi } from "@/hooks/useApi"
import { RevenueData } from "@/types/api"

export function Overview() {
  const { data: revenueData, loading, error } = useApi<RevenueData[]>('/api/revenue');

  if (loading) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-red-500">Error loading revenue data</div>
        </div>
      </ResponsiveContainer>
    );
  }

  const data = revenueData || [];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
