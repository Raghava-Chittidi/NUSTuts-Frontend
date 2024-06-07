import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Modal({
  title,
  body,
  component,
}: {
  title: string;
  body: string;
  component: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <span onClick={onOpen}>{component}</span>
      <NextUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{body}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button variant="solid" color="danger" onPress={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextUIModal>
    </>
  );
}
