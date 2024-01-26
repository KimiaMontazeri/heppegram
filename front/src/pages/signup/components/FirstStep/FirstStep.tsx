import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const FirstStep = ({ handleContinue }: { handleContinue: () => void }) => {
  const navigate = useNavigate();
  // username
  const [username, setUsername] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(''); // username is already taken...

  // password
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleClickOnLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    setIsUsernameInvalid(!username);
    setIsPasswordValid(!password || password.length < 6);

    const shouldReturn = !username || !password || password.length < 6;
    if (shouldReturn) {
      return;
    }

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
          <FormHelperText>{usernameHelperText}</FormHelperText>
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
