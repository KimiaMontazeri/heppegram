import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { customFetch } from '../../../../services/fetch';
import { BASE_URL } from '../../../../services/http-client';
import type { SecondStepProps } from './second-step.types';

const SecondStep = ({ username, password }: SecondStepProps) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [isFirstnameInvalid, setIsFirstnameInvalid] = useState(false);
  const [lastname, setLastname] = useState('');
  const [isLastnameInvalid, setIsLastnameInvalid] = useState(false);

  const [phone, setPhone] = useState('');
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  const [bio, setBio] = useState('');

  const [photo, setPhoto] = useState<File | null>();

  const handleRegister = async () => {
    await customFetch({
      url: `${BASE_URL}/api/register`,
      method: 'POST',
      payload: {
        firstname,
        lastname,
        username,
        password,
        phone,
      },
      sendCredentials: false,
    })
      .then(async (res) => {
        res.json();
      })
      .then((response) => {
        console.log({ response });
        toast({
          title: 'Account created.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleSubmit = (e: MouseEvent) => {
    let toastTitle;
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
      toast({
        title: toastTitle || 'Please enter the correct info!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    console.log(photo);

    handleRegister();
    // setTimeout(() => {
    //   setLoading(false);
    //   // if ok
    //   toast({
    //     title: 'Account created.',
    //     status: 'success',
    //     duration: 2000,
    //     isClosable: true,
    //   });
    //   handleContinue();
    // }, 2000);
  };

  return (
    <form>
      <Stack width='300px'>
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            isInvalid={isFirstnameInvalid}
            placeholder='Enter your name'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            isInvalid={isLastnameInvalid}
            placeholder='Enter your last name'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone number</FormLabel>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='number'
            isInvalid={isPhoneInvalid}
            placeholder='Enter your phone number'
          />
          <FormHelperText textAlign='start'>
            Phone number should start with 09
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Enter a biography of yourself...'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type='file'
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const file = files[0];
                setPhoto(file);
              }
            }}
          />
        </FormControl>
        <Button type='submit' isLoading={loading} onClick={handleSubmit}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default SecondStep;
