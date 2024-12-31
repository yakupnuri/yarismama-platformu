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

const Dashboard = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const { toast } = useToast();

  // Örnek veri - gerçek uygulamada API'den gelecek
  const activities4_8 = [
    { id: "sure", name: "Sure Ezberleme", points: 3 },
    { id: "salavat", name: "Salavat Getirme", points: 1 },
    { id: "iyilik", name: "İyilik Yapma", points: 1 },
  ];

  const activities8_10 = [
    { id: "namaz", name: "Namaz Kılma", points: 5 },
    { id: "kuran", name: "Kur'an Okuma", points: 4 },
    { id: "sure", name: "Sure Ezberleme", points: 3 },
  ];

  // Örnek grafik verisi
  const chartData = [
    { name: "Pazartesi", puan: 20 },
    { name: "Salı", puan: 25 },
    { name: "Çarşamba", puan: 30 },
    { name: "Perşembe", puan: 22 },
    { name: "Cuma", puan: 35 },
    { name: "Cumartesi", puan: 28 },
    { name: "Pazar", puan: 32 },
  ];

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

    // Burada API'ye gönderilecek
    toast({
      title: "Başarılı",
      description: "Etkinlik kaydedildi!",
    });
    setActivityValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Yarışma Takip Sistemi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Etkinlik Girişi */}
          <Card>
            <CardHeader>
              <CardTitle>Günlük Etkinlik Girişi</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="4-8">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="4-8">4-8 Yaş</TabsTrigger>
                  <TabsTrigger value="8-10">8-10 Yaş</TabsTrigger>
                </TabsList>

                <TabsContent value="4-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activities4_8.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-2 rounded bg-orange-50 hover:bg-orange-100 cursor-pointer"
                        onClick={() => setSelectedActivity(activity.id)}
                      >
                        <div>
                          <h4 className="font-medium">{activity.name}</h4>
                          <p className="text-sm text-gray-600">
                            {activity.points} puan/adet
                          </p>
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
                    <Button type="submit" className="w-full">Kaydet</Button>
                  </form>
                </TabsContent>

                <TabsContent value="8-10">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activities8_10.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-2 rounded bg-blue-50 hover:bg-blue-100 cursor-pointer"
                        onClick={() => setSelectedActivity(activity.id)}
                      >
                        <div>
                          <h4 className="font-medium">{activity.name}</h4>
                          <p className="text-sm text-gray-600">
                            {activity.points} puan/adet
                          </p>
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
                    <Button type="submit" className="w-full">Kaydet</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sağ Taraf - Grafik ve İstatistikler */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Haftalık Performans</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="puan" fill="#8884d8" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Genel Sıralama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ahmet</span>
                      <span>450 puan</span>
                    </div>
                    <Progress value={90} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ayşe</span>
                      <span>400 puan</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mehmet</span>
                      <span>350 puan</span>
                    </div>
                    <Progress value={70} />
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