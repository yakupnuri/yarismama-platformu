import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthTabs = () => {
  return (
    <Tabs defaultValue="login" className="w-full max-w-sm mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Giriş Yap</TabsTrigger>
        <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-6">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register" className="mt-6">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};