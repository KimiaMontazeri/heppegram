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
  Spinner,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import type { ProfileModalProps } from './profile-modal.types';
import { type ChangeEvent, useState, useEffect } from 'react';
import { customFetch } from '../../services/fetch';
import useUserStore from '../../store/user-store';
import { getUsername } from '../../services/user';

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const username =
    useUserStore((state) => state.user?.username) || getUsername();
  const setUser = useUserStore((state) => state.setUser);
  const toast = useToast();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [isFirstnameInvalid, setIsFirstnameInvalid] = useState(false);
  const [lastname, setLastname] = useState('');
  const [isLastnameInvalid, setIsLastnameInvalid] = useState(false);
  const [phone, setPhone] = useState('');
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [bio, setBio] = useState('');
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

  const handleUpdateProfile = async () => {
    setLoadingUpdateProfile(true);
    const payload = {
      firstname,
      lastname,
      phone,
      image,
      bio,
    };

    const { ok, body } = await customFetch({
      url: `/api/users/${username}`,
      method: 'PATCH',
      payload,
    });

    if (ok) {
      toast({
        title: 'Profile updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      const { ID, Username, Firstname, Lastname, Image } = body;
      setUser({ username: Username, id: ID });

      // update the store as well
      setUser({
        id: ID,
        username: Username,
        firstname: Firstname,
        lastname: Lastname,
        image: Image,
      });
    } else {
      toast({
        title: 'An error occurred trying to update profile.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    setLoadingUpdateProfile(false);
  };

  const handleSubmitProfile = () => {
    let toastTitle;

    setIsFirstnameInvalid(!firstname);
    setIsLastnameInvalid(!lastname);

    const phoneInvalid =
      !phone || !phone.startsWith('09') || phone.length !== 11;
    setIsPhoneInvalid(phoneInvalid);
    if (!phone.startsWith('09')) {
      toastTitle = 'Phone number should start with 09!';
    } else if (phone.length !== 11) {
      toastTitle = 'Phone number should be 11 digits!';
    }

    const shouldReturn =
      !firstname ||
      !lastname ||
      !phone ||
      !phone.startsWith('09') ||
      phone.length !== 11;

    if (shouldReturn) {
      toast({
        title: toastTitle || 'Please enter the correct info!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    handleUpdateProfile();
  };

  const handleGetProfile = async () => {
    setLoadingProfile(true);
    const { ok, body } = await customFetch({
      url: `/api/users/${username}`,
      method: 'GET',
    });

    setLoadingProfile(false);
    if (ok) {
      const { ID, Firstname, Lastname, Phone, Image, Bio } = body;
      setUser({ username, id: ID });
      setFirstname(Firstname);
      setLastname(Lastname);
      setPhone(Phone);
      setImage(Image);
      setBio(Bio);
    } else {
      toast({
        title: 'An error occurred while fetching user data.',
        status: 'error',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleGetProfile();
    }
  }, [isOpen]);

  const getContent = () => (
    <>
      <ModalBody>
        <Center>
          <Avatar
            name={`${firstname} ${lastname}`}
            src={previewImage || ''}
            size='xl'
            style={{ cursor: 'pointer' }}
          />
        </Center>
        <FormControl pb={2}>
          <FormLabel>First name</FormLabel>
          <Input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            isInvalid={isFirstnameInvalid}
          />
        </FormControl>
        <FormControl pb={2}>
          <FormLabel>Last name</FormLabel>
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            isInvalid={isLastnameInvalid}
          />
        </FormControl>
        <FormControl pb={2}>
          <FormLabel>Phone number</FormLabel>
          <Input
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={isPhoneInvalid}
          />
        </FormControl>
        <FormControl pb={2}>
          <FormLabel>Bio</FormLabel>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>
        <FormControl pb={2}>
          <FormLabel>Profile Picture</FormLabel>
          <Flex gap={1}>
            <Input type='file' accept='image/*' onChange={handleImageChange} />
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
        <Button
          variant='ghost'
          onClick={handleSubmitProfile}
          isLoading={loadingUpdateProfile}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        {loadingProfile ? (
          <Center>
            <Spinner size='lg' />
          </Center>
        ) : (
          getContent()
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
