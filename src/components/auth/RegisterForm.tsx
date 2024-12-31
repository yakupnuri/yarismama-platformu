import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Baby, Cat, Dog, Rabbit, Squirrel } from "lucide-react";
import { cn } from "@/lib/utils";

const avatars = [
  { icon: Baby, label: "Bebek" },
  { icon: Cat, label: "Kedi" },
  { icon: Dog, label: "Köpek" },
  { icon: Rabbit, label: "Tavşan" },
  { icon: Squirrel, label: "Sincap" },
];

const colors = [
  { value: "#F2FCE2", label: "Açık Yeşil" },
  { value: "#FEF7CD", label: "Açık Sarı" },
  { value: "#FEC6A1", label: "Açık Turuncu" },
  { value: "#E5DEFF", label: "Açık Mor" },
  { value: "#FFDEE2", label: "Açık Pembe" },
];

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const { toast } = useToast();

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
    if (!age || !selectedAvatar || !selectedColor) {
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
        <Label>Avatar Seç</Label>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center p-2 border rounded-lg cursor-pointer transition-all",
                selectedAvatar === label
                  ? "border-primary bg-primary/10"
                  : "border-input hover:border-primary/50"
              )}
              onClick={() => setSelectedAvatar(label)}
            >
              <Icon className="w-12 h-12 mb-2" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Renk Seç</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="grid grid-cols-5 gap-2"
        >
          {colors.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-col items-center space-y-2 peer-data-[state=checked]:ring-2 ring-primary rounded-md p-2 cursor-pointer"
              >
                <div
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: value }}
                />
                <span className="text-xs text-center">{label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full bg-[#90EE90] hover:bg-[#90EE90]/90">
        Kayıt Ol
      </Button>
    </form>
  );
};