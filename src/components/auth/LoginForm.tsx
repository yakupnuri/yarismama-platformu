import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basit bir doğrulama
    if (email === "test@test.com" && password === "password") {
      toast({
        title: "Başarılı",
        description: "Giriş yapıldı!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Hata",
        description: "Email veya şifre hatalı!",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
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
      <Button type="submit" className="w-full bg-[#30D5C8] hover:bg-[#30D5C8]/90">
        Giriş Yap
      </Button>
    </form>
  );
};