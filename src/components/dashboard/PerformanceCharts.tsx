import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { getUserData } from "@/data/tempStorage";

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

  // Transform data to include user colors
  const transformDataWithColors = (data: any[]) => {
    return data.map(item => ({
      ...item,
      fill: userColor // Use the user's color for all bars
    }));
  };

  const coloredWeeklyData = transformDataWithColors(weeklyData);
  const coloredMonthlyData = transformDataWithColors(monthlyData);

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
            <BarChart data={coloredWeeklyData} {...commonChartProps}>
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
                radius={[4, 4, 0, 0]}
                fillOpacity={0.9}
              >
                {
                  coloredWeeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))
                }
              </Bar>
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
            <BarChart data={coloredMonthlyData} {...commonChartProps}>
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
                radius={[4, 4, 0, 0]}
                fillOpacity={0.9}
              >
                {
                  coloredMonthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))
                }
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};