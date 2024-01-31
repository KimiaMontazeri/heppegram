import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
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
import type { CreateGroupModalProps } from './create-group-modal.types';

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Name and photo */}
          <FormControl>
            <FormLabel>Enter group name and photo</FormLabel>
            <Input variant='filled' placeholder='Group name' mb={2} />
            <Input variant='filled' type='file' placeholder='Group photo' />
          </FormControl>
          <Divider py={2} />

          {/* Members */}
          <FormControl pt={2}>
            <FormLabel>Add group members</FormLabel>
            <InputGroup variant='filled'>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon />
              </InputLeftElement>
              <Input type='search' placeholder='Search people' />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGroupModal;
