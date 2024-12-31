import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Trophy, Star, Book, Heart, Bookmark, CircleUser } from "lucide-react";

const Dashboard = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const { toast } = useToast();

  const activities4_8 = [
    { id: "sure", name: "Sure Ezberleme", points: 3, icon: <Book className="w-5 h-5" /> },
    { id: "salavat", name: "Salavat Getirme", points: 1, icon: <Heart className="w-5 h-5" /> },
    { id: "iyilik", name: "İyilik Yapma", points: 1, icon: <Star className="w-5 h-5" /> },
  ];

  const activities8_10 = [
    { id: "namaz", name: "Namaz Kılma", points: 5, icon: <CircleUser className="w-5 h-5" /> },
    { id: "kuran", name: "Kur'an Okuma", points: 4, icon: <Book className="w-5 h-5" /> },
    { id: "sure", name: "Sure Ezberleme", points: 3, icon: <Bookmark className="w-5 h-5" /> },
  ];

  const chartData = [
    { name: "Pazartesi", puan: 20 },
    { name: "Salı", puan: 25 },
    { name: "Çarşamba", puan: 30 },
    { name: "Perşembe", puan: 22 },
    { name: "Cuma", puan: 35 },
    { name: "Cumartesi", puan: 28 },
    { name: "Pazar", puan: 32 },
  ];

  const chartConfig = {
    puan: {
      color: "hsl(var(--primary))",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity || !activityValue) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Başarılı",
      description: "Etkinlik kaydedildi!",
    });
    setActivityValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Yarışma Takip Sistemi
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Toplam Puanınız</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                156
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Günlük Etkinlik Girişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="4-8" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="4-8">4-8 Yaş</TabsTrigger>
                  <TabsTrigger value="8-10">8-10 Yaş</TabsTrigger>
                </TabsList>

                <TabsContent value="4-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activities4_8.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                          selectedActivity === activity.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-orange-50 hover:bg-orange-100 border-2 border-transparent"
                        } cursor-pointer`}
                        onClick={() => setSelectedActivity(activity.id)}
                      >
                        <div className="flex items-center gap-3">
                          {activity.icon}
                          <div>
                            <h4 className="font-medium">{activity.name}</h4>
                            <p className="text-sm text-gray-600">
                              {activity.points} puan/adet
                            </p>
                          </div>
                        </div>
                        <Input
                          type="number"
                          min="0"
                          className="w-24"
                          value={selectedActivity === activity.id ? activityValue : ""}
                          onChange={(e) => setActivityValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ))}
                    <Button type="submit" className="w-full">
                      Kaydet
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="8-10">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activities8_10.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                          selectedActivity === activity.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-blue-50 hover:bg-blue-100 border-2 border-transparent"
                        } cursor-pointer`}
                        onClick={() => setSelectedActivity(activity.id)}
                      >
                        <div className="flex items-center gap-3">
                          {activity.icon}
                          <div>
                            <h4 className="font-medium">{activity.name}</h4>
                            <p className="text-sm text-gray-600">
                              {activity.points} puan/adet
                            </p>
                          </div>
                        </div>
                        <Input
                          type="number"
                          min="0"
                          className="w-24"
                          value={selectedActivity === activity.id ? activityValue : ""}
                          onChange={(e) => setActivityValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ))}
                    <Button type="submit" className="w-full">
                      Kaydet
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  Haftalık Performans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="puan" fill="hsl(var(--primary))" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Genel Sıralama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ahmet</span>
                      <span className="text-primary font-bold">450 puan</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ayşe</span>
                      <span className="text-primary font-bold">400 puan</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Mehmet</span>
                      <span className="text-primary font-bold">350 puan</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
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