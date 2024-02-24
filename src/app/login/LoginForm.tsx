

import {
  Button,
  Card,
  Flex,
  Text,
  Container,
  TextField,
  IconButton,
} from "@radix-ui/themes";

import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { login, signup } from "./actions";
import Link from "next/link";
interface LoginFormI {
  isSignup?: boolean;
}
export default function LoginForm({ isSignup }: LoginFormI) {
  
  return (
    <Container size={{ lg: "1", md: "1", sm: "1", xs: "1" }} mt={"9"}>
      <Card>
        <Flex gap={"3"} direction={"column"}>
          <Text align={"center"}>{isSignup ? "Registrarme" : "Iniciar sesión"}</Text>
          <form action={isSignup ? signup : login}>
          <Flex gap={"3"} direction={"column"}>
            <EmailInput />
            <PasswordInput />
            {isSignup && <PasswordInput isSignup/>}
            <Button variant={"solid"} type={"submit"}>
              {isSignup ? "Registrarme" : "Iniciar sesión"}
            </Button>
            </Flex>
          </form>
          <Flex gap={"3"} direction={"column"}>

            <Button variant={"surface"}>
          <Link href={isSignup ? "/login" : "/signup"} className="no-underline">
            {isSignup ? "Iniciar sesión" : "Registrarme"}
            </Link>
            </Button>
            {/* <Text as={"p"} size={"1"} align={"center"}>
              Recuperar contraseña
            </Text> */}
            </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
