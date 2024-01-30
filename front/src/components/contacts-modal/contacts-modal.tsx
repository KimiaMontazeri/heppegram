import {
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ContactsModalProps } from './contacts-modal.types';
import { SearchIcon } from '@chakra-ui/icons';
import Person from '../person';

const ContactsModal = ({ isOpen, onClose }: ContactsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contacts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup variant='filled'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon />
            </InputLeftElement>
            <Input type='search' placeholder='Search contacts' />
          </InputGroup>
          <List
            textAlign='start'
            bgColor={useColorModeValue('gray.100', 'gray.700')}
            borderRadius='lg'
            p={2}
            px={3}
            m={4}
          >
            <Person
              name='Dan Abrahmov'
              username='@dan123'
              image='https://bit.ly/dan-abramov'
            />
            <Person name='Kimia Montazeri' username='@kimimtz' />
            <Person name='Farhad Aman' username='@farhad' />
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactsModal;
