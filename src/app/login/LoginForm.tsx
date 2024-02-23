import {
  Button,
  Card,
  Flex,
  Text,
  Container,
  TextField,
  IconButton,
} from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { login, signup } from "./actions";
type StateI = {
  email: string;
  password: string;
  error: string;
  isVisible: boolean;
};

const initialState = {
  email: "",
  password: "",
  error: "",
  isVisible: false,
};

export default function LoginForm() {
  return (
    <form>
      <Container size={{ lg: "1", md: "1", sm: "1", xs: "1" }} mt={"9"}>
        <Card>
          <Flex gap={"3"} direction={"column"}>
            <Text align={"center"}>Inicia sesión o registrate</Text>
            <EmailInput />
            <PasswordInput />
            <Button variant={"solid"} formAction={login}>
              Iniciar Sesión
            </Button>
            <Button variant={"surface"} formAction={signup}>
              Registrarme
            </Button>
            <Text as={"p"} size={"1"} align={"center"}>
              Recuperar contraseña
            </Text>
          </Flex>
        </Card>
      </Container>
    </form>
  );
}
