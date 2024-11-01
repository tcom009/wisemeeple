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
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { login, signup } from "./actions";
import SmallSpinner from "@/core/components/SmallSpinner";
type StateI = {
  email: string;
  password: string;
  repeatPassword: string;
  error: string;
  isVisible: boolean;
  isLoading: boolean;
};

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
  error: "",
  isLoading: false,
  isVisible: false,
};

interface AuthFormI {
  isSignup?: boolean;
}

export default function AuthForm({ isSignup }: AuthFormI) {
  const [state, setState] = useState<StateI>(initialState);
  const { email, password, error, isVisible, isLoading, repeatPassword } =
    state;
  const setIsLoading = (state: boolean) =>
    setState((prevState) => ({
      ...prevState,
      isLoading: state,
    }));

  const hasSamePassword = () => password === repeatPassword && true;
  const handleSignUp = async () => {
    setIsLoading(true);
    if (email && password && hasSamePassword()) {
      const data = await signup({
        email,
        password,
      });
      if (data?.error) {
        setState((prevState) => ({
          ...prevState,
          error: data.error.message,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        error: "Por favor, asegurate de llenar todos los campos",
      }));
    }
    if (email && password && !hasSamePassword()) {
      setState((prevState) => ({
        ...prevState,
        error: "Las contraseñas no coinciden",
      }));
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (email && password) {
      const data = await login({
        email,
        password,
      });
      if (data?.error) {
        setState((prevState) => ({
          ...prevState,
          error: "Credenciales invalidas, intentalo de nuevo",
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        error: "Por favor, asegurate de llenar todos los campos",
      }));
    }
    setIsLoading(false);
  };

  const handleOnChange =
    (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        [fieldName]: event.target.value,
      }));
    };

  const passwordToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isVisible: !prevState.isVisible,
    }));
  };
  useEffect(() => {
    if (email || password) {
      setState((prevState) => ({
        ...prevState,
        error: "",
      }));
    }
  }, [email, password]);
  return (
    <Container size={{ lg: "1", md: "1", sm: "1", xs: "1" }} mt={"9"}>
      <Card>
        <Flex gap={"3"} direction={"column"}>
          <Text align={"center"}>
            {isSignup ? "Regístrate" : "Iniciar Sesión"}
          </Text>
          <TextField.Root
            size={"3"}
            name="email"
            value={email}
            id="email"
            type="email"
            onChange={handleOnChange("email")}
            placeholder="Email"
          >
            <TextField.Slot>
              <EnvelopeClosedIcon />
            </TextField.Slot>
          </TextField.Root>
          <TextField.Root
            size={"3"}
            name="password"
            id="password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handleOnChange("password")}
            placeholder="Contraseña"
          >
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
            <TextField.Slot>
              <IconButton variant={"ghost"} onClick={passwordToggle}>
                {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          {isSignup && (
            <TextField.Root
              size={"3"}
              name="repeatPassword"
              id="repeatPassword"
              type={isVisible ? "text" : "password"}
              value={state.repeatPassword}
              onChange={handleOnChange("repeatPassword")}
              placeholder="Repite la contraseña"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          )}
          {error && (
            <Text size={"1"} color="crimson">
              {error}
            </Text>
          )}

          {isLoading ? (
            <Button variant={"solid"} disabled>
              <SmallSpinner />
            </Button>
          ) : (
            <Button
              variant={"solid"}
              onClick={isSignup ? handleSignUp : handleLogin}
            >
              {isSignup ? "Registrarme" : "Iniciar sesión"}
            </Button>
          )}

          <Button variant={"surface"}>
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="no-underline"
            >
              {isSignup ? "Iniciar sesión" : "Registrarme"}
            </Link>
          </Button>
        </Flex>
      </Card>
    </Container>
  );
}
