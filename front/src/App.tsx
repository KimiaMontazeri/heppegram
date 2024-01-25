import { Button, Stack, useColorMode } from '@chakra-ui/react';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Stack>
  );
}

export default App;
