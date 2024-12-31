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
              alt="Kinder Atlas Logo"
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
          
          {/* Main Content */}
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#30D5C8] to-[#87CEEB]">
              Kinder Atlas
            </h1>
            <p className="text-lg text-gray-600">
              Çocuklar için eğlenceli ve eğitici bir dünya keşfi
            </p>
          </div>

          {/* Auth Section */}
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <AuthTabs />
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
            <Card className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]">
              <h3 className="text-xl font-semibold text-[#FFD700]">Eğlenceli Öğrenme</h3>
              <p className="mt-2 text-gray-600">İnteraktif oyunlar ve aktivitelerle öğrenme</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-[#87CEEB]/10 to-[#87CEEB]/5 border-[#87CEEB]">
              <h3 className="text-xl font-semibold text-[#87CEEB]">Güvenli Ortam</h3>
              <p className="mt-2 text-gray-600">Çocuklar için özel tasarlanmış güvenli platform</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-[#DDA0DD]/10 to-[#DDA0DD]/5 border-[#DDA0DD]">
              <h3 className="text-xl font-semibold text-[#DDA0DD]">Ebeveyn Kontrolü</h3>
              <p className="mt-2 text-gray-600">Gelişim takibi ve ebeveyn yönetim paneli</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;