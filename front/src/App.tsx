import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './App.css';
import {
  Center,
  Heading,
  Icon,
  IconButton,
  theme,
  useColorMode,
} from '@chakra-ui/react';
import { ChatIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
  return (
    <>
      <Center justifyContent='space-between' p={4}>
        <Heading size='md' as='h1' textColor={theme.colors.teal[400]}>
          Heppegram!
          <Icon pl={2} boxSize='1.2em'>
            <ChatIcon />
          </Icon>
        </Heading>
        <IconButton
          icon={colorModeIcon}
          aria-label='toggle-mode'
          onClick={toggleColorMode}
          isRound
          // variant='ghost'
        />
      </Center>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
