import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { saveUserData } from "@/data/tempStorage";
import { PasswordInput } from "./PasswordInput";
import { AvatarUpload } from "./AvatarUpload";
import { ColorPicker } from "./ColorPicker";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [hue, setHue] = useState(180);
  const [gender, setGender] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor!",
        variant: "destructive",
      });
      return;
    }
    if (!age || !gender || !username) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun!",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          age,
          gender,
          color: `hsl(${hue}, 70%, 60%)`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userEmail", email);

        saveUserData(email, {
          email,
          username,
          age,
          gender,
          avatarPreview,
          color: `hsl(${hue}, 70%, 60%)`,
        });

        toast({
          title: "Başarılı",
          description: "Kayıt başarılı!",
        });
      } else {
        toast({
          title: "Hata",
          description: data.message || "Kayıt işlemi başarısız!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  const selectedColor = `hsl(${hue}, 70%, 60%)`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Şifre"
        required
      />
      
      <PasswordInput
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Şifreyi Tekrarla"
        required
      />

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

      <AvatarUpload
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
        setAvatarFile={setAvatarFile}
        gender={gender}
        selectedColor={selectedColor}
      />

      <ColorPicker hue={hue} setHue={setHue} />

      <Button type="submit" className="w-full bg-[#90EE90] hover:bg-[#90EE90]/90">
        Kayıt Ol
      </Button>
    </form>
  );
};