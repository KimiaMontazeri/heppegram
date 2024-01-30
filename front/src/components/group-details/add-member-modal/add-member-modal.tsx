import {
  Button,
  FormControl,
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
import type { AddMemberModalProps } from './add-member-modal.types';
import { SearchIcon } from '@chakra-ui/icons';

const AddMemberModal = ({ isOpen, onClose }: AddMemberModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <InputGroup variant='filled'>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon />
              </InputLeftElement>
              <Input type='search' placeholder='Search people' />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberModal;
