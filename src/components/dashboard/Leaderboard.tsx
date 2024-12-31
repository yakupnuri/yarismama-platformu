import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, Medal, Trophy, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import axios from 'axios';

interface Ranking {
  name: string;
  points: number;
}

const Leaderboard = ({ className = '' }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/leaderboard');
        setRankings(response.data.map((user: any) => ({
          name: user.email.split('@')[0],
          points: user.score || 0
        })));
      } catch (error) {
        console.error('Error fetching rankings:', error);
        // Fallback to mock data if API fails
        const mockRankings = [
          { name: "Ahmet", points: 450 },
          { name: "Ayşe", points: 400 },
          { name: "Mehmet", points: 350 },
          { name: "Fatma", points: 300 },
          { name: "Ali", points: 250 }
        ];
        setRankings(mockRankings);
      }
    };

    fetchRankings();
  }, []);

  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-amber-700" />;
      default:
        return <Star className="w-6 h-6 text-blue-400" />;
    }
  };

  const getGradientColor = (index: number) => {
    switch (index) {
      case 0:
        return "from-yellow-100 to-yellow-50";
      case 1:
        return "from-gray-100 to-gray-50";
      case 2:
        return "from-amber-100 to-amber-50";
      default:
        return "from-white to-gray-50";
    }
  };

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Crown className="w-8 h-8 text-yellow-500" />
          Liderlik Tablosu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankings.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg bg-gradient-to-r ${getGradientColor(index)} hover:scale-102 transition-transform duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                    {getPositionIcon(index)}
                  </div>
                  <span className="font-semibold text-lg text-gray-800">
                    {user.name}
                  </span>
                </div>
                <span className="text-lg font-bold text-primary">
                  {user.points} puan
                </span>
              </div>
              <Progress 
                value={(user.points / 500) * 100} 
                className="h-2 bg-gray-100"
                style={{
                  '--progress-background': index === 0 
                    ? 'linear-gradient(to right, #ffd700, #ffed4a)' 
                    : undefined
                } as React.CSSProperties}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;