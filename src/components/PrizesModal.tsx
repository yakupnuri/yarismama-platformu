import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { saveUserData, getUserData } from "@/data/tempStorage";

interface PrizesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing?: boolean;
}

export const PrizesModal = ({
  open,
  onOpenChange,
  isEditing = false,
}: PrizesModalProps) => {
  const [prizes, setPrizes] = useState(() => {
    const userData = getUserData("test@test.com");
    return userData?.prizes || "";
  });

  const handleSave = () => {
    saveUserData("test@test.com", { prizes });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {isEditing ? "Ödülleri Düzenle" : "Ödüller"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={prizes}
                onChange={(e) => setPrizes(e.target.value)}
                placeholder="Ödülleri buraya giriniz..."
                className="min-h-[400px]"
              />
              <Button onClick={handleSave} className="w-full">
                Kaydet
              </Button>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{prizes}</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};