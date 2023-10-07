"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import React from "react";

export const Logout = () => {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          callbackUrl: `/auth`,
        })
      }
    >
      Log out
    </DropdownMenuItem>
  );
};
