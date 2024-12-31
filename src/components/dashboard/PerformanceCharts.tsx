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
      color: userColor || "#94a3b8",
      label: "Puan"
    },
  };

  const commonChartProps = {
    barSize: 20,
    className: "h-[200px]",
    margin: { top: 5, right: 5, bottom: 5, left: 5 }
  };

  const commonAxisProps = {
    axisLine: false,
    tickLine: false,
    fontSize: 10,
    stroke: "#94a3b8",
    tick: { fill: '#94a3b8' }
  };

  // Define gradient colors for bars
  const gradientColors = [
    "#8B5CF6", // Vivid Purple
    "#D946EF", // Magenta Pink
    "#F97316", // Bright Orange
    "#0EA5E9", // Ocean Blue
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#40E0D0]" />
            Aylık Performansın
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig}>
            <BarChart data={weeklyData} {...commonChartProps}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
              />
              <YAxis 
                {...commonAxisProps}
                width={20}
              />
              <Tooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="puan" 
                fill={gradientColors[0]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#40E0D0]" />
            Haftalık Performansın
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig}>
            <BarChart data={monthlyData} {...commonChartProps}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
              />
              <YAxis 
                {...commonAxisProps}
                width={20}
              />
              <Tooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="puan" 
                fill={gradientColors[2]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};