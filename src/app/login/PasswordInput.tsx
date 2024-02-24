"use client";
import { TextField, IconButton } from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

interface LoginFormI {
  isSignup?: boolean;
}

export default function PasswordInput({ isSignup }: LoginFormI) {
  const [isVisible, setState] = useState<boolean>(false);
  const passwordToggle = () => {
    setState((prevState) => !prevState);
  };

  return (
    <TextField.Root>
      <TextField.Slot>
        <LockClosedIcon />
      </TextField.Slot>
      <TextField.Input
        size={"3"}
        name={isSignup ? "repeatPassword" : "password"}
        id={isSignup ? "repeatPassword" : "password"}
        type={isVisible ? "text" : "password"}
        placeholder={isSignup ? "Repetir contraseña" : "Contraseña"}
        required
      />
      <TextField.Slot>
        <IconButton
          variant={"ghost"}
          onClick={() => passwordToggle}
        >
          {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
}
