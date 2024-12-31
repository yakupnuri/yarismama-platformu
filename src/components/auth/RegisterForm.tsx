import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const colors = [
  { value: "#F2FCE2", label: "Açık Yeşil" },
  { value: "#FEF7CD", label: "Açık Sarı" },
  { value: "#FEC6A1", label: "Açık Turuncu" },
  { value: "#E5DEFF", label: "Açık Mor" },
  { value: "#FFDEE2", label: "Açık Pembe" },
  { value: "#FDE1D3", label: "Açık Şeftali" },
  { value: "#D3E4FD", label: "Açık Mavi" },
  { value: "#F1F0FB", label: "Açık Gri" },
  { value: "#8B5CF6", label: "Canlı Mor" },
  { value: "#D946EF", label: "Magenta Pembe" },
  { value: "#F97316", label: "Parlak Turuncu" },
  { value: "#0EA5E9", label: "Okyanus Mavisi" }
];

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor!",
        variant: "destructive",
      });
      return;
    }
    if (!age || !selectedColor || !avatarFile) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun!",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Başarılı",
      description: "Kayıt başarılı!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Şifreyi Tekrarla"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Yaş"
          min="5"
          max="18"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Senin Avatarın</Label>
        <div className="flex flex-col items-center space-y-4">
          {avatarPreview ? (
            <div className="relative w-32 h-32">
              <img
                src={avatarPreview}
                alt="Avatar önizleme"
                className="w-full h-full object-cover rounded-full"
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
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-upload"
            required
          />
          <Label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md"
          >
            Avatar Yükle
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Senin Rengin Ne?</Label>
        <div className="grid grid-cols-4 gap-3">
          {colors.map(({ value, label }) => (
            <div
              key={value}
              className="flex flex-col items-center space-y-2"
              onClick={() => setSelectedColor(value)}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full cursor-pointer transition-all border-4",
                  selectedColor === value ? "border-primary" : "border-transparent"
                )}
                style={{ backgroundColor: value }}
                title={label}
              />
              <span className="text-xs text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#90EE90] hover:bg-[#90EE90]/90">
        Kayıt Ol
      </Button>
    </form>
  );
};