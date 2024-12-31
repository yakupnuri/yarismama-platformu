import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getLeaderboard } from "@/services/api";

interface LeaderboardUser {
  email: string;
  score: number;
  color: string;
}

export const Leaderboard = () => {
  const { toast } = useToast();
  
  const { data: rankings, error, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    select: (data: LeaderboardUser[]) => data.map(user => ({
      name: user.email.split('@')[0],
      points: user.score || 0,
      color: user.color
    }))
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Veri yüklenirken hata oluştu",
        description: "Lütfen daha sonra tekrar deneyin",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">{index + 1}</span>;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Liderlik Tablosu Yükleniyor...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Liderlik Tablosu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rankings?.map((ranking, index) => (
          <motion.div
            key={ranking.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-white hover:shadow-md transition-all border border-gray-100"
          >
            {getPositionIcon(index)}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{ranking.name}</span>
                <span className="text-primary font-bold">{ranking.points} puan</span>
              </div>
              <Progress value={(ranking.points / 500) * 100} className="h-2" />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};