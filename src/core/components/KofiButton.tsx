import { Badge } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const KofiButton = () => {
  return (
    <Link href="https://ko-fi.com/P5P8OSJJA" target="_blank">
      <Badge color="orange">
        <Image height={25} width={30} src="/kofi_symbol.png" alt="Invitame un café" />
      Invitame un café
      </Badge>
    </Link>
  );
};

export default KofiButton;
