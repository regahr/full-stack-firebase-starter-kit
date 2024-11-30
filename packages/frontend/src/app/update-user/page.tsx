"use client";

import UpdateForm from "@/components/UpdateForm";
import { useRouter } from "next/navigation";

const UpdateUserPage: React.FC = () => {
  const router = useRouter();

  const handleUpdateUserSuccess = () => {
    router.push("/home"); 
  };

  const handleInvalidatedToken = () => {
    router.push("/"); 
  };

  return (
    <div>
      <UpdateForm onUpdateUserSuccess={handleUpdateUserSuccess} onInvalidatedToken={handleInvalidatedToken}  />
    </div>
  );
};

export default UpdateUserPage;
