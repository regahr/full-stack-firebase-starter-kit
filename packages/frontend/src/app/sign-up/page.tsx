"use client";

import { useRouter } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.push("/home"); 
  };

  return (
    <div>
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
    </div>
  );
};

export default SignUpPage;