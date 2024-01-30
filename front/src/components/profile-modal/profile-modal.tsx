import {
  Avatar,
  Button,
  Center,
  Flex,
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
import { type ChangeEvent, useState } from 'react';

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleClose = () => {
    handleClearImage();
    onClose();
  };

  const handleSubmitProfile = () => {
    console.log({ image });
    // TODO: send the data to the server
    // if ok, close the modal and show a success toast
    // else, don't close the modal and show an error toast
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Avatar
              name='Dan Abrahmov'
              src={previewImage ? previewImage : 'https://bit.ly/dan-abramov'}
              size='2xl'
              style={{ cursor: 'pointer' }}
            />
          </Center>
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
            <Flex gap={1}>
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              <Button
                disabled={true}
                colorScheme='gray'
                onClick={handleClearImage}
                isDisabled={!image || !previewImage}
              >
                Clear
              </Button>
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={handleSubmitProfile}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
