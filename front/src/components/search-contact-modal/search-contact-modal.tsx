import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import type { SearchContactModalProps } from './search-contact-modal.types';

const SearchContactModal = ({ isOpen, onClose }: SearchContactModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup variant='filled'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon />
            </InputLeftElement>
            <Input type='search' placeholder='Search people' />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchContactModal;
