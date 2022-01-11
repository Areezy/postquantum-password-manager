import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InputGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { LockClosedIcon } from '@heroicons/react/outline';
import AppContext from 'renderer/context/AppContext';
import axios from 'axios';
import { validatePassphrase } from '../../helpers/validationHelpers';
// import {}
// import { useState } from 'react';

export default function PassphraseModal(props: any) {
  const { accessToken, setValidPassphrase,setPassphrase, pqSecureKey } = useContext(AppContext);
  //   const { isOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState<boolean>(props.isOpen);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [passphraseEntry, setPassphraseEntry] = useState<string>();
  const [invalidPassphrase, setInvalidPassphrase] = useState<boolean>();

  //   const [passphrase, setPassphrase] = useState<string>();

  const verifyPassphrase = async () => {
    try {
      
      await validatePassphrase(passphraseEntry, accessToken, pqSecureKey);
      setShowModal(false);
      setPassphrase(passphraseEntry);
      setValidPassphrase(true);
    } catch (error) {
      setInvalidPassphrase(true);
      setTimeout(()=> {setInvalidPassphrase(false)}, 300);
      setPassphraseEntry('');
    }
  };



  return (
    <Modal isOpen={showModal} onClose={() => !showModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please provide your passphrase</ModalHeader>
        <ModalBody bg={invalidPassphrase ? '#FC8181' : '#fff'}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter passphrase"
              value={passphraseEntry}
              onChange={(e) => setPassphraseEntry(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            mt={2}
            rightIcon={<LockClosedIcon className="h-4" />}
            colorScheme="blue"
            onClick={verifyPassphrase}
          >
            Unlock
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
