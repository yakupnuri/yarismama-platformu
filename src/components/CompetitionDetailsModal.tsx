import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompetitionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompetitionDetailsModal = ({
  open,
  onOpenChange,
}: CompetitionDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            ÜÇ AYLAR ÇOCUKLAR İÇİN ÖDÜLLÜ YARIŞMA PROGRAMI
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#9b87f5] mb-4">8-10 Yaş Grubu İçin:</h3>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p className="font-semibold">En Güzel Cami Maketi Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, kendi hayal gücü ve el becerileriyle bir cami maketi yapacaklar.</li>
                    <li>Maketler, 3 ay boyunca oluşturulacak özel bir köşede sergilenecek.</li>
                    <li>Dereceye girenlere sürpriz ödüller!</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">En Çok Namaz Kılma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, günlük kıldıkları namazları bir çizelgede işaretleyecek.</li>
                    <li>En düzenli ve çok namaz kılan ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">En Çok Kur'an Okuma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, her gün Kur'an-ı Kerim'den belirli bir bölümü okuyarak puan toplayacak.</li>
                    <li>En çok sayfayı okuyan ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">En Çok Sure Ezberleme Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklardan Kur'an'daki kısa surelerden ezberlemeleri istenecek.</li>
                    <li>Ezberledikleri sureler jüri tarafından değerlendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Hayalinizdeki Cenneti Çizin:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, hayal ettikleri cenneti resim kağıtlarına çizecek.</li>
                    <li>Hayallerini en güzel şekilde anlatan resimler ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Aileye Yardım Etme Çizelgesi:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, her gün ailelerine yaptıkları bir yardımı yazıp puan toplayacak.</li>
                    <li>(Örneğin: Masayı topladım, kardeşime ders çalıştırdım vb.)</li>
                    <li>En çok yardım eden çocuklar ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">İyilik Yapma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, günlük olarak yaptıkları iyilikleri bir çizelgede kaydedecek.</li>
                    <li>(Örneğin: Arkadaşımı sevindirdim, çöpleri topladım vb.)</li>
                    <li>En çok iyilik yapan çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Sağlıklı Besin Yeme Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, gün içinde yedikleri sağlıklı yiyecekleri bir çizelgeye yazacak.</li>
                    <li>(Örneğin: Meyve, sebze veya ev yapımı sağlıklı yiyecekler)</li>
                    <li>Sağlıklı beslenme alışkanlığını en iyi gösteren çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Elektronik Cihazları Kontrollü Kullanma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, günlük 2 saatten fazla elektronik cihaz kullanmayarak puan toplayacak.</li>
                    <li>Bu kurala en çok uyan çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#9b87f5] mb-4">4-8 Yaş Grubu İçin:</h3>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p className="font-semibold">En Güzel Cami Maketi Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, ailelerinin yardımıyla basit ve renkli cami maketleri yapacaklar.</li>
                    <li>Bu maketler de özel köşede sergilenecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">En Çok Sure Ezberleme Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklardan yaşlarına uygun kısa sureleri ezberlemeleri istenecek.</li>
                    <li>Ezberledikleri sureler jüri tarafından değerlendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">En Çok Salavat Getirme Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, gün içinde Peygamberimiz (sav) için salavat getirecek ve sayılarını kaydedecek.</li>
                    <li>En çok salavat çeken çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Hayalinizdeki Cenneti Çizin:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, hayallerindeki cenneti rengarenk resimlerle ifade edecek.</li>
                    <li>En yaratıcı çizimler ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Aileye Yardım Etme Çizelgesi:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, ailelerine yaptıkları küçük yardımları kaydedecek.</li>
                    <li>(Örneğin: Oyuncakları toplama, sofrayı kurma vb.)</li>
                    <li>En çok yardım eden çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">İyilik Yapma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Günlük iyiliklerini (paylaşma, arkadaşlarına yardım etme vb.) yazacaklar.</li>
                    <li>İyiliklerini kaydeden ve en çok puan alan ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Sağlıklı Besin Yeme Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Çocuklar, sağlıklı yiyecekleri tercih ederek bunları bir listeye yazacaklar.</li>
                    <li>En sağlıklı seçimleri yapan ödüllendirilecek.</li>
                  </ul>
                </li>
                <li>
                  <p className="font-semibold">Elektronik Cihazları Kontrollü Kullanma Yarışması:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Günlük cihaz kullanımını 2 saat ile sınırlayan çocuklar puan kazanacak.</li>
                    <li>Kurala en çok uyan çocuk ödüllendirilecek.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};