import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  IconButton,
  Menu,
  MenuButton,
  Portal,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import ProfileModal from '../profile-modal';
import { useState } from 'react';

export const SideBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const colorModeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
  return (
    <Stack
      alignItems='center'
      py={4}
      justifyContent='space-between'
      height='100vh'
    >
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <Menu>
        <MenuButton>
          <Avatar
            name='Dan Abrahmov'
            src='https://bit.ly/dan-abramov'
            style={{ cursor: 'pointer' }}
            onClick={() => setProfileModalOpen(true)}
          >
            <AvatarBadge boxSize='1em' bg='green.500' />
          </Avatar>
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem onClick={() => setSearchContactModalOpen(true)}>
              Add a new contact
            </MenuItem>
            <MenuItem onClick={() => setCreateGroupModalOpen(true)}>
              Add a new group
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      {/* <Avatar
              name='Dan Abrahmov'
              src='https://bit.ly/dan-abramov'
              style={{ cursor: 'pointer' }}
              onClick={() => setProfileModalOpen(true)}
            >
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar> */}
      <IconButton
        icon={colorModeIcon}
        aria-label='toggle-mode'
        onClick={toggleColorMode}
        isRound
      />
    </Stack>
  );
};
