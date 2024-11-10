"use client";
import { DropdownMenu } from "@radix-ui/themes";
import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";
//import { useState } from 'react';
import { Button, Text, Avatar, Box } from "@radix-ui/themes";
import "./menu-styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";
interface MenuProps {
  profileId: string;
  catalogId: string;
}

function Menu({ profileId, catalogId }: MenuProps) {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {/* <HamburgerMenuIcon /> */}
        <Button size={{ xs: "1", initial: "1" }} my="1" radius="full">
          <PersonIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => router.push(`/profile/${profileId}`)}>
          Perfil
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => router.push(`/catalog/${catalogId}`)}
          disabled={!catalogId}
        >
          Catálogo
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => router.push(`/sell`)}
          disabled={!catalogId}
        >
          Agregar juego
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="DropdownMenuSeparator" />
        <DropdownMenu.Item color="red" onClick={() => logout()}>
          <Text align={"center"}>Cerrar sesión</Text>
          <ExitIcon />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default Menu;
