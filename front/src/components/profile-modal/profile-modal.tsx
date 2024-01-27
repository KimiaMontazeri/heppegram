import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import type { ProfileModalProps } from './profile-modal.types';

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb={2}>
            <FormLabel>First name</FormLabel>
            <Input
              value='Kimia'
              //   value={firstname}
              //   onChange={(e) => setFirstname(e.target.value)}
              //   isInvalid={isFirstnameInvalid}
            />
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Last name</FormLabel>
            <Input
              value='Montazeri'
              //   value={lastname}
              //   onChange={(e) => setLastname(e.target.value)}
              //   isInvalid={isLastnameInvalid}
              //   placeholder='Enter your last name'
            />
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Phone number</FormLabel>
            <Input
              value='09102014779'
              type='tel'
              //   value={phone}
              //   onChange={(e) => setPhone(e.target.value)}
              //   type='number'
              //   isInvalid={isPhoneInvalid}
              //   placeholder='Enter your phone number'
            />
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value='your bio...'
              //   value={bio}
              //   onChange={(e) => setBio(e.target.value)}
              //   placeholder='Enter a biography of yourself...'
            />
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type='file'
              //   onChange={(e) => {
              //     const files = e.target.files;
              //     if (files) {
              //       const file = files[0];
              //       setPhoto(file);
              //     }
              //   }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
