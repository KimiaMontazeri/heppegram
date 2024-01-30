import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import ProfileModal from '../profile-modal';
import { useState } from 'react';
import ContactsModal from '../contacts-modal';

const SideBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [contactsModalOpen, setContactsModalOpen] = useState(false);

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
      <ContactsModal
        isOpen={contactsModalOpen}
        onClose={() => setContactsModalOpen(false)}
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
            <MenuItem onClick={() => setProfileModalOpen(true)}>
              Open profile
            </MenuItem>
            <MenuItem onClick={() => setContactsModalOpen(true)}>
              Open contacts list
            </MenuItem>
            <MenuItem>Logout</MenuItem>
            <MenuItem>Delete account</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
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
