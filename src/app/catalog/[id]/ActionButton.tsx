import { Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
interface ActionButtonProps {
  matchsCatalog: boolean;
  user: any | undefined;
}
export default function ActionButton({
  matchsCatalog,
  user,
}: ActionButtonProps) {
  if (matchsCatalog) {
    return (
      <Link className="no-underline" href={"/sell"}>
        <Button>
          <PlusIcon /> Agregar nuevo
        </Button>
      </Link>
    );
  }
  if (!matchsCatalog && user.data.user) {
    return null
  } 
  else {
    return (
      <Link className="no-underline" href={"/login"}>
        <Button>Crear cuenta</Button>
      </Link>
    );
  }
}
