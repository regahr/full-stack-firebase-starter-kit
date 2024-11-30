"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/home");
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
