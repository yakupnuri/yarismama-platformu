import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { CompetitionDetailsModal } from "@/components/CompetitionDetailsModal";
import { useState } from "react";

const Index = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-12">
            <Card 
              className="p-6 bg-gradient-to-br from-[#9b87f5]/10 to-[#9b87f5]/5 border-[#9b87f5] cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={() => setShowDetailsModal(true)}
            >
              <h3 className="text-xl font-semibold text-[#9b87f5]">Yarışma Detayları</h3>
              <p className="mt-2 text-gray-600">Yarışma kuralları ve katılım şartları</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 border-[#0EA5E9]">
              <h3 className="text-xl font-semibold text-[#0EA5E9]">Ödüller</h3>
              <p className="mt-2 text-gray-600">Kazananlara verilecek ödüller</p>
            </Card>
          </div>
        </div>
      </div>

      <CompetitionDetailsModal 
        open={showDetailsModal} 
        onOpenChange={setShowDetailsModal}
      />
    </div>
  );
};

export default Index;