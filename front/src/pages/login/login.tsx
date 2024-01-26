import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

function Login() {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [phone, setPhone] = useState('');
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const [bio, setBio] = useState('');

  const handleSubmit = () => {
    setLoading(true);

    setIsUsernameInvalid(!username);
    setIsPasswordValid(!password || password.length < 6);
    setIsPhoneInvalid(!phone || !phone.startsWith('09'));

    const shouldReturn =
      !username ||
      !password ||
      password.length < 6 ||
      !phone ||
      !phone.startsWith('09');

    if (shouldReturn) {
      return;
    }

    setTimeout(() => {
      setLoading(false);
      console.log('done');
    }, 2000);

    // TODO:
    // const {ok, body, error} = login(username, password);
    // if (ok) {
    //   and any other logic...
    // } else {
    //   // error handling
    // }
  };

  const getContent = () => (
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
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder='Enter your name'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder='Enter your last name'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone number</FormLabel>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='number'
            placeholder='Enter your phone number'
          />
          <FormHelperText textAlign='start'>
            Phone number should start with 09
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Enter a biography of yourself'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Upload your image</FormLabel>
          <Input type='file' />
        </FormControl>
        <Button type='submit' isLoading={loading} onClick={handleSubmit}>
          Continue
        </Button>
      </Stack>
    </form>
  );

  return (
    <Stack align='center' width='800px'>
      <Heading as='h1' size='xl'>
        Create Account
      </Heading>
      <Text pb={4}>Connect with your friends today!</Text>
      {getContent()}
    </Stack>
  );
}

export default Login;
