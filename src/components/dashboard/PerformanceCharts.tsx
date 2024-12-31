import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface PerformanceChartsProps {
  weeklyData: any[];
  monthlyData: any[];
  userColor: string;
}

export const PerformanceCharts = ({ weeklyData, monthlyData, userColor }: PerformanceChartsProps) => {
  const chartConfig = {
    puan: {
      color: userColor || "#1e293b",
      label: "Puan"
    },
  };

  const commonChartProps = {
    barSize: 40,
    className: "h-[300px]",
  };

  const commonAxisProps = {
    axisLine: false,
    tickLine: false,
    fontSize: 12,
    stroke: "#94a3b8",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Trophy className="w-5 h-5" />
            Haftalık Performans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={weeklyData} {...commonChartProps}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
              />
              <YAxis 
                {...commonAxisProps}
                width={30}
              />
              <Tooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="puan" 
                fill={userColor || "#1e293b"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Trophy className="w-5 h-5" />
            Aylık Performans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={monthlyData} {...commonChartProps}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
              />
              <YAxis 
                {...commonAxisProps}
                width={30}
              />
              <Tooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="puan" 
                fill={userColor || "#1e293b"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};