import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveUserData, getUserData } from "@/data/tempStorage";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PrizesEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prizes, setPrizes] = useState(() => {
    const userData = getUserData("test@test.com");
    return userData?.prizes || "";
  });

  const handleSave = () => {
    saveUserData("test@test.com", { prizes });
    toast({
      title: "Başarılı",
      description: "Ödüller kaydedildi.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Ödülleri Düzenle</h1>
        <Textarea
          value={prizes}
          onChange={(e) => setPrizes(e.target.value)}
          placeholder="Ödülleri buraya giriniz..."
          className="min-h-[400px]"
        />
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            İptal
          </Button>
          <Button onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrizesEdit;