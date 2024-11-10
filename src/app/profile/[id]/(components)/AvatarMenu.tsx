"use client"
import { DropdownMenu, Button } from "@radix-ui/themes";
import { CameraIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
interface Props {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteAvatar: () => void;
  inputRef?: React.RefObject<HTMLInputElement> | null;
}

const AvatarMenu = ({ handleFile, deleteAvatar, inputRef= null }: Props) => {
  const handleFileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }
  return (
    <DropdownMenu.Root >
      <DropdownMenu.Trigger>
        <Button
          title="Eliminar imagen"
          size="1"
          radius="full"
          className="file-input-button"
        >
          <Pencil1Icon  style={{width: "2em", height: "2em"}}/>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => inputRef?.current?.click()}>
          <input
            type="file"
            ref={inputRef}
            onChange={(event) => {
              handleFile(event);
            }}
            className="file-input"
            accept=".jpeg, .jpg, .png"
            onClick={handleFileClick}
/>
          Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={deleteAvatar} color="red">
          Eliminar
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AvatarMenu;
