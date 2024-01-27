import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  IconButton,
  Stack,
  useColorMode,
} from '@chakra-ui/react';

const SideBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
  return (
    <Stack
      alignItems='center'
      py={4}
      justifyContent='space-between'
      height='100vh'
    >
      <Avatar
        name='Dan Abrahmov'
        src='https://bit.ly/dan-abramov'
        style={{ cursor: 'pointer' }}
      >
        <AvatarBadge boxSize='1em' bg='green.500' />
      </Avatar>
      <IconButton
        icon={colorModeIcon}
        aria-label='toggle-mode'
        onClick={toggleColorMode}
        isRound
      />
    </Stack>
  );
};

export default SideBar;
