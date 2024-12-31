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

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="bg-[#FEF7CD] border-none shadow-sm">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Önceki Performansın
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig}>
            <BarChart data={weeklyData} {...commonChartProps}>
              <CartesianGrid vertical={false} horizontal={false} />
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
                fill={userColor || "#94a3b8"}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#FDE1D3] border-none shadow-sm">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Rakiplerinin Performansı
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig}>
            <BarChart data={monthlyData} {...commonChartProps}>
              <CartesianGrid vertical={false} horizontal={false} />
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
                fill={userColor || "#94a3b8"}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};