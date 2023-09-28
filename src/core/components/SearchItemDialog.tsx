import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ListItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export default function Modal({ open, onOpenChange, children }: ListItemProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

type ModalContentProps = {
  title: string;
  children: ReactNode;
};
const ModalContent = ({ title, children }: ModalContentProps) => {
  return (
    <Dialog.Content>
      <Flex align={"center"} gap={"3"} direction={"row"} justify={"between"}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Close>
          <Cross2Icon />
        </Dialog.Close>
      </Flex>
      {children}
    </Dialog.Content>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
