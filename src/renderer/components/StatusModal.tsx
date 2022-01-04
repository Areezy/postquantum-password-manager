import { useContext, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InputGroup,
  ModalCloseButton,
  Button,
  Text,
  ModalFooter,
  InputRightElement,
  ScaleFade,
} from '@chakra-ui/react';
import AppContext from 'renderer/context/AppContext';

export default function StatusModal(props: any) {
  const [showModal, setShowModal] = useState<boolean>(props.isOpen);
  const { modalActive, setModalActive } = useContext(AppContext);

  // const {isOpen, onClose} = useDisclosure();

  return (
    <>
      <ScaleFade initialScale={0.9} in={props.isOpen}>
        <Modal
          isCentered
          isOpen={modalActive}
          onClose={() => setModalActive(!modalActive)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg={props.error ? '#FC8181' : '#fff'}>
              {props.title || 'Modal Title'}
            </ModalHeader>
            <ModalBody bg={props.error ? '#FC8181' : '#fff'}>
              <Text fontSize="lg">{props.content || 'Modal body'}</Text>
            </ModalBody>
            <ModalFooter bg={props.error ? '#FC8181' : '#fff'}>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={props.btnFunction ? props.btnFunction : () => setModalActive(!modalActive)}
              >
                {props.buttonText || 'close'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScaleFade>
    </>
  );
}
