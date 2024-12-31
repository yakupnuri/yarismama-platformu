import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { getCurrentUser } from "@/services/api";
import axios from 'axios';

const Leaderboard = ({ className = '' }) => {
  const [rankings, setRankings] = useState<Array<{name: string, points: number}>>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rankings');
        setRankings(response.data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          Genel Sıralama
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {rankings.map((user, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{user.name}</span>
                <span className="text-primary font-bold">{user.points} puan</span>
              </div>
              <Progress value={(user.points / 500) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;