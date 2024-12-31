import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, UserRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AvatarUploadProps {
  avatarPreview: string;
  setAvatarPreview: (preview: string) => void;
  setAvatarFile: (file: File | null) => void;
  gender: string;
  selectedColor: string;
}

export const AvatarUpload = ({
  avatarPreview,
  setAvatarPreview,
  setAvatarFile,
  gender,
  selectedColor,
}: AvatarUploadProps) => {
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Hata",
          description: "Dosya boyutu 5MB'dan küçük olmalıdır!",
          variant: "destructive",
        });
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDefaultAvatar = () => {
    if (!avatarPreview) {
      if (gender === "kiz") {
        return <UserRound className="w-16 h-16" style={{ color: selectedColor }} />;
      } else if (gender === "erkek") {
        return <User className="w-16 h-16" style={{ color: selectedColor }} />;
      }
      return <Upload className="w-8 h-8" style={{ color: selectedColor }} />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Label>Senin Avatarın</Label>
      <div className="flex flex-col items-center space-y-4">
        {avatarPreview ? (
          <div className="relative w-32 h-32">
            <img
              src={avatarPreview}
              alt="Avatar önizleme"
              className="w-full h-full object-cover rounded-full"
              style={{ border: `4px solid ${selectedColor}` }}
            />
            <button
              type="button"
              onClick={() => {
                setAvatarFile(null);
                setAvatarPreview("");
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <div 
            className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center"
            style={{ borderColor: selectedColor }}
          >
            {getDefaultAvatar()}
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          id="avatar-upload"
        />
        <Label
          htmlFor="avatar-upload"
          className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md"
        >
          Avatar Yükle
        </Label>
      </div>
    </div>
  );
};