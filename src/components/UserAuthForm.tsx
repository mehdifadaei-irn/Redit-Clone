"use client";

import React, { FC } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";
import { error } from "console";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const logInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      // toast Notif
      toast({
        title: "There was a problem",
        description: "There was and error logging in with google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size={"sm"}
        className="w-full"
        onClick={logInWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.github className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
