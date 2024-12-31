import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Book, Heart, Home, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { DailyActivities } from "@/components/dashboard/DailyActivities";
import { getUserData } from "@/data/tempStorage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("hsl(var(--primary))");
  const [rankings, setRankings] = useState<Array<{name: string, points: number, color: string}>>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast({
        title: "Hata",
        description: "Lütfen önce giriş yapın!",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setCurrentUserEmail(userEmail);
    const userData = getUserData(userEmail);
    if (userData) {
      setUserAge(userData.age);
      setUserColor(userData.color || "hsl(var(--primary))");

      // Simüle edilmiş kullanıcı verileri
      const ahmetData = getUserData("ahmet@example.com");
      const ayseData = getUserData("ayse@example.com");
      const mehmetData = getUserData("mehmet@example.com");

      setRankings([
        { 
          name: "Ahmet", 
          points: 450, 
          color: ahmetData?.color || "hsl(265, 70%, 60%)" // Varsayılan mor
        },
        { 
          name: "Ayşe", 
          points: 400, 
          color: ayseData?.color || "hsl(330, 70%, 60%)" // Varsayılan pembe
        },
        { 
          name: "Mehmet", 
          points: 350, 
          color: mehmetData?.color || "hsl(200, 70%, 60%)" // Varsayılan mavi
        }
      ]);
    }
  }, [toast, navigate]);

  const weeklyData = [
    { name: "Pazartesi", puan: 20 },
    { name: "Salı", puan: 25 },
    { name: "Çarşamba", puan: 30 },
    { name: "Perşembe", puan: 22 },
    { name: "Cuma", puan: 35 },
    { name: "Cumartesi", puan: 28 },
    { name: "Pazar", puan: 32 },
  ];

  const monthlyData = [
    { name: "1. Hafta", puan: 180 },
    { name: "2. Hafta", puan: 220 },
    { name: "3. Hafta", puan: 190 },
    { name: "4. Hafta", puan: 240 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/acd36c23-c6bb-40b7-9f7c-e255f13c9779.png"
              alt="Atlas Kinder Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              Yarışma Takip Sistemi
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Hoş geldin, {currentUserEmail}</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                156
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyActivities userAge={userAge} />

          <div className="space-y-8">
            <PerformanceCharts
              weeklyData={weeklyData}
              monthlyData={monthlyData}
              userColor={userColor}
            />

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Genel Sıralama ({userAge} Yaş Grubu)
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
                      <Progress 
                        value={(user.points / 500) * 100} 
                        className="h-2"
                        style={{ 
                          '--progress-background': user.color
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
