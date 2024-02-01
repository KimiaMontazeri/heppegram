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
  useToast,
} from '@chakra-ui/react';
import type { DeleteAccountModalProps } from './delete-account-modal.types';
import { getUsername, removeUsername } from '../../services/user';
import { customFetch } from '../../services/fetch';
import { removeToken } from '../../services/token';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleDeleteAccount = async () => {
    const username = getUsername();
    const { ok } = await customFetch({
      url: `/api/users/${username}`,
      method: 'DELETE',
    });

    if (ok) {
      removeToken();
      removeUsername();
      navigate('/signup');
    } else {
      toast({
        title: 'An error occurred.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete your account?</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' colorScheme='gray' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={handleDeleteAccount}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;
