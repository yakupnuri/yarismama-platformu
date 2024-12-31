import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthTabs } from "@/components/auth/AuthTabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="relative w-64 h-64">
            <img
              src="/lovable-uploads/bd4ce9a5-8ce8-4795-a555-075047e7ab7d.png"
              alt="Kaybedeni Olmayan Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          
          {/* Main Content */}
          <div className="text-center space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#0EA5E9]">
              Kaybedeni Olmayan
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-600">
              Yarışma Platformu
            </p>
            <h2 className="text-[14px] font-bold text-gray-800 mt-8">
              ÜÇ AYLAR ÇOCUKLAR İÇİN ÖDÜLLÜ YARIŞMA PROGRAMI
            </h2>
          </div>

          {/* Auth Section */}
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <AuthTabs />
          </div>
          
          {/* Age Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-12">
            {/* 4-8 Yaş Grubu */}
            <Card className="p-6 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 border-[#F97316]">
              <h3 className="text-2xl font-bold text-[#F97316] mb-4">4-8 Yaş Grubu Yarışmaları</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">1.</span>
                  <div>
                    <span className="font-semibold">En Güzel Cami Maketi Yarışması:</span>
                    <p className="text-sm">Ailelerle birlikte basit ve renkli cami maketleri yapılacak</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">2.</span>
                  <div>
                    <span className="font-semibold">En Çok Sure Ezberleme Yarışması:</span>
                    <p className="text-sm">Yaşa uygun kısa surelerin ezberlenmesi</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">3.</span>
                  <div>
                    <span className="font-semibold">En Çok Salavat Getirme Yarışması:</span>
                    <p className="text-sm">Günlük salavat sayısı kaydedilecek</p>
                  </div>
                </li>
              </ul>
            </Card>

            {/* 8-10 Yaş Grubu */}
            <Card className="p-6 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 border-[#0EA5E9]">
              <h3 className="text-2xl font-bold text-[#0EA5E9] mb-4">8-10 Yaş Grubu Yarışmaları</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">1.</span>
                  <div>
                    <span className="font-semibold">En Güzel Cami Maketi Yarışması:</span>
                    <p className="text-sm">Kendi hayal gücü ve el becerisiyle cami maketi yapımı</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">2.</span>
                  <div>
                    <span className="font-semibold">En Çok Namaz Kılma Yarışması:</span>
                    <p className="text-sm">Günlük namaz takibi ve puanlama</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">3.</span>
                  <div>
                    <span className="font-semibold">En Çok Kur'an Okuma Yarışması:</span>
                    <p className="text-sm">Günlük Kur'an-ı Kerim okuma ve puanlama</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
            <Card className="p-6 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 border-[#F97316]">
              <h3 className="text-xl font-semibold text-[#F97316]">Yarışma Detayları</h3>
              <p className="mt-2 text-gray-600">Yarışma kuralları ve katılım şartları</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 border-[#0EA5E9]">
              <h3 className="text-xl font-semibold text-[#0EA5E9]">Ödüller</h3>
              <p className="mt-2 text-gray-600">Kazananlara verilecek ödüller</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-[#9b87f5]/10 to-[#9b87f5]/5 border-[#9b87f5]">
              <h3 className="text-xl font-semibold text-[#9b87f5]">Başvuru</h3>
              <p className="mt-2 text-gray-600">Yarışmaya başvuru süreci</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;