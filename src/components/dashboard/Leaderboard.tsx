import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Ranking {
  name: string;
  points: number;
}

const fetchLeaderboard = async () => {
  try {
    const response = await axios.get('/api/user/leaderboard');
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((user: any) => ({
        name: user.email.split('@')[0],
        points: user.score || 0
      }));
    }
    throw new Error('Invalid data format received from API');
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const Leaderboard = () => {
  const { toast } = useToast();
  const { data: rankings, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    initialData: [
      { name: "Ahmet", points: 450 },
      { name: "Ayşe", points: 400 },
      { name: "Mehmet", points: 350 },
      { name: "Fatma", points: 300 },
      { name: "Ali", points: 250 },
    ]
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Veri yüklenirken hata oluştu",
        description: "Örnek veriler gösteriliyor",
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
            className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all"
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