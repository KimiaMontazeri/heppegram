import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { customFetch } from '../../services/fetch';
import { setToken } from '../../services/token';
import useUserStore from '../../store/user-store';

function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  // password
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleClickOnSignup = () => {
    navigate('/signup');
  };

  const handleLogin = async () => {
    setLoading(true);
    const { ok, status, body } = await customFetch({
      url: `/api/login`,
      method: 'POST',
      payload: {
        username,
        password,
      },
      sendCredentials: false,
    });

    if (ok) {
      toast({
        title: 'Successfully logged in.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setToken(body.token);
      setUser({ username: username });
      setLoading(false);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      return;
    }

    setLoading(false);
    toast({
      title: status === 401 ? body.message : 'An error occurred.',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    setIsUsernameInvalid(!username);
    setIsPasswordValid(!password);

    const shouldReturn = !username || !password;
    if (shouldReturn) {
      return;
    }

    handleLogin();
  };

  return (
    <Center pt={16}>
      <Stack align='center' width='450px'>
        <Heading as='h1' size='xl'>
          Hi, Welcome Back! 👋
        </Heading>
        <Text pb={4}>Hello again, you've been missed!</Text>
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
            </FormControl>
            <Button type='submit' onClick={handleSubmit} isLoading={loading}>
              Continue
            </Button>
            <Button variant='outline' onClick={handleClickOnSignup}>
              Don't have an account?
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}

export default Login;
