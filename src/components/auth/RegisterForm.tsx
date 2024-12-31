import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, User, UserRound } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [hue, setHue] = useState(180);
  const [gender, setGender] = useState<string>("");
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
    if (!age || !gender) {
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

  const selectedColor = `hsl(${hue}, 70%, 60%)`;

  const getDefaultAvatar = () => {
    if (!avatarFile) {
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
        <Label>Cinsiyetin</Label>
        <RadioGroup
          onValueChange={setGender}
          className="flex flex-col space-y-2"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kiz" id="kiz" />
            <Label htmlFor="kiz" className="cursor-pointer">Kız</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="erkek" id="erkek" />
            <Label htmlFor="erkek" className="cursor-pointer">Erkek</Label>
          </div>
        </RadioGroup>
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

      <div className="space-y-4">
        <Label>Senin Rengin Ne?</Label>
        <div className="space-y-6">
          <div 
            className="w-full h-24 rounded-lg"
            style={{ backgroundColor: selectedColor }}
          />
          <Slider
            value={[hue]}
            onValueChange={(values) => setHue(values[0])}
            max={360}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#90EE90] hover:bg-[#90EE90]/90">
        Kayıt Ol
      </Button>
    </form>
  );
};