"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    try {
      signIn("google", {
        callbackUrl: "/role?auth=true",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => handleGoogleLogin()}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            more coming soon
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled>
        <Icons.twitter className="mr-2 h-4 w-4" />
        Twitter (now X)
      </Button>
      <Button variant="outline" type="button" disabled>
        <Icons.apple className="mr-2 h-4 w-4" />
        Apple
      </Button>
    </div>
  );
};

export default UserAuthForm;
