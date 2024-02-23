"use client";
import {
  Button,
  Card,
  Flex,
  Text,
  Container,
  TextField,
  IconButton,
} from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

export default function PasswordInput() {
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
        name="password"
        id="password"
        type={isVisible ? "text" : "password"}
        placeholder="Contraseña"
        required
      />
      <TextField.Slot>
        <IconButton variant={"ghost"} onClick={passwordToggle}>
          {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
}
