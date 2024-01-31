import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import type { DeleteMessageModalProps } from './delete-message-modal.types';

const DeleteMessageModal = ({ isOpen, onClose }: DeleteMessageModalProps) => {
  const handleDeleteMessage = () => {
    // call delete message api
    // we should get the message data as well
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete a Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this message?</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' colorScheme='gray' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={handleDeleteMessage}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMessageModal;
