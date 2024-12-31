import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
        const response = await axios.get('http://localhost:3001/api/competition/rankings');
        setRankings(response.data);
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