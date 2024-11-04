"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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
      <DropdownMenu.Trigger asChild>
        {/* <HamburgerMenuIcon /> */}
        <Button size={{ xs: "1", initial: "1" }} my="1" radius="full">
          <PersonIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <button onClick={() => router.push(`/profile/${profileId}`)}>
              Perfil
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            <button
              onClick={() => router.push(`/catalog/${catalogId}`)}
              disabled={!catalogId}
            >
              Catálogo
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            <button onClick={() => router.push(`/sell`)} disabled={!catalogId}>
              Agregar juego
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <button onClick={() => logout()}>
              <Text align={"center"}>Cerrar sesión</Text>
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Menu;
