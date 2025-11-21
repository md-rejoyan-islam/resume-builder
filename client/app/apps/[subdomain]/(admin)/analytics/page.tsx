"use client";

import { Button } from "@/components/ui/button";
import { Download, TrendingDown, TrendingUp } from "lucide-react";

const AnalyticsPage = () => {
  const metrics = [
    {
      title: "Page Views",
      value: "45,231",
      change: 12,
      type: "increase" as const,
    },
    {
      title: "Unique Visitors",
      value: "8,234",
      change: 8,
      type: "increase" as const,
    },
    {
      title: "Bounce Rate",
      value: "32%",
      change: 5,
      type: "decrease" as const,
    },
    {
      title: "Avg. Session Duration",
      value: "3m 24s",
      change: 2,
      type: "increase" as const,
    },
  ];

  const documentStats = [
    { type: "Resume", count: 3420, growth: 15 },
    { type: "Cover Letter", count: 2850, growth: 12 },
    { type: "Disclosure", count: 1230, growth: 8 },
  ];

  const topCountries = [
    { country: "United States", users: 540, percentage: 35 },
    { country: "United Kingdom", users: 280, percentage: 18 },
    { country: "Canada", users: 215, percentage: 14 },
    { country: "Australia", users: 180, percentage: 12 },
    { country: "Others", users: 285, percentage: 21 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Platform performance and user insights
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-6"
          >
            <p className="text-sm text-muted-foreground mb-2">{metric.title}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.type === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.type === "increase" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {metric.change}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Statistics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Document Statistics</h2>
        <div className="space-y-4">
          {documentStats.map((stat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{stat.type}</p>
                <div className="text-right">
                  <p className="font-bold">{stat.count.toLocaleString()}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    ↑ {stat.growth}% this month
                  </p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-600 to-purple-600 h-full rounded-full"
                  style={{
                    width: `${(stat.count / 3420) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Users by Country</h2>
          <div className="space-y-4">
            {topCountries.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{item.country}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.users}
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium w-12 text-right">
                  {item.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Hourly Activity</h2>
          <div className="space-y-3">
            {[
              { hour: "12 AM", activity: 12 },
              { hour: "3 AM", activity: 8 },
              { hour: "6 AM", activity: 15 },
              { hour: "9 AM", activity: 45 },
              { hour: "12 PM", activity: 78 },
              { hour: "3 PM", activity: 92 },
              { hour: "6 PM", activity: 85 },
              { hour: "9 PM", activity: 65 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium text-muted-foreground">
                  {item.hour}
                </span>
                <div className="flex-1 bg-muted rounded h-6 relative overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-600 to-purple-600 h-full rounded"
                    style={{ width: `${(item.activity / 100) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-right text-muted-foreground">
                  {item.activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Document Conversion Rate</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: "Started", count: "12,540" },
            { action: "Completed", count: "8,234" },
            { action: "Exported", count: "6,125" },
            { action: "Downloaded", count: "5,892" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-4 border border-border rounded-lg"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {item.action}
              </p>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
          <div className="flex items-end gap-4">
            <p className="text-3xl font-bold">49.5%</p>
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">
              ↑ 2.3% from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
