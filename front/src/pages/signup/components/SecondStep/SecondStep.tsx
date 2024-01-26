import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

const SecondStep = ({ handleContinue }: { handleContinue: () => void }) => {
  const [loading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [isFirstnameInvalid, setIsFirstnameInvalid] = useState(false);
  const [lastname, setLastname] = useState('');
  const [isLastnameInvalid, setIsLastnameInvalid] = useState(false);

  const [phone, setPhone] = useState('');
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  const [bio, setBio] = useState('');

  const [photo, setPhoto] = useState<File | null>();

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    setIsFirstnameInvalid(!firstname);
    setIsLastnameInvalid(!lastname);
    setIsPhoneInvalid(!phone || !phone.startsWith('09') || phone.length !== 11);

    const shouldReturn =
      !firstname ||
      !lastname ||
      !phone ||
      !phone.startsWith('09') ||
      phone.length !== 11;
    if (shouldReturn) {
      setLoading(false);
      return;
    }

    console.log({ photo });

    setTimeout(() => {
      setLoading(false);
      handleContinue();
    }, 2000);
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
