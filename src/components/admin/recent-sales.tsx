'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useApi } from "@/hooks/useApi"
import { Sale } from "@/types/api"

export function RecentSales() {
  const { data: sales, loading, error } = useApi<Sale[]>('/api/sales');

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="ml-4 space-y-1 flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-red-500">Error loading sales data: {error}</p>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-muted-foreground">No sales data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatarUrl || undefined} alt="Avatar" />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}
