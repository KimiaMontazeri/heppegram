import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import type { FirstStepProps } from './first-step.types';

const FirstStep = ({ handleContinue, handleSetPayload }: FirstStepProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  // username
  const [username, setUsername] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  // password
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleClickOnLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    let toastTitle;
    const passwordLengthOk = password.length >= 6;

    if (!passwordLengthOk) {
      toastTitle = 'Password should be at least 6 characters!';
    }

    setIsUsernameInvalid(!username);
    setIsPasswordValid(!password || !passwordLengthOk);

    const shouldReturn = !username || !password || !passwordLengthOk;
    if (shouldReturn) {
      toast({
        title: toastTitle || 'Please enter the correct info!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    handleSetPayload({
      username,
      password,
    });
    handleContinue();
  };

  return (
    <form>
      <Stack width='300px'>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            isInvalid={isUsernameInvalid}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            isInvalid={isPasswordValid}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter your password'
          />
          <FormHelperText textAlign='start'>
            Password should at least be 6 characters
          </FormHelperText>
        </FormControl>
        <Button type='submit' onClick={handleSubmit}>
          Continue
        </Button>
        <Button variant='outline' onClick={handleClickOnLogin}>
          Already have an account?
        </Button>
      </Stack>
    </form>
  );
};

export default FirstStep;
