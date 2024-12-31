import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Competition = () => {
  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#222222]">
          Yarışma Bilgileri
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F97316]">
                Yarışma Kuralları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Yarışmaya katılım için temel kurallar ve gereksinimler burada listelenecek.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Kural 1</li>
                <li>Kural 2</li>
                <li>Kural 3</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0EA5E9]">
                Ödüller
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Yarışma sonucunda kazananlara verilecek ödüller:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Birincilik Ödülü</li>
                <li>İkincilik Ödülü</li>
                <li>Üçüncülük Ödülü</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-[#9b87f5]">
                Başvuru Süreci
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Yarışmaya başvuru yapmak için izlemeniz gereken adımlar:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Kayıt olun</li>
                <li>Başvuru formunu doldurun</li>
                <li>Gerekli belgeleri yükleyin</li>
                <li>Başvurunuzu gönderin</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Competition;