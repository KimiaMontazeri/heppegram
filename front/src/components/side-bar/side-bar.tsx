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
import { useEffect, useState } from 'react';
import ContactsModal from '../contacts-modal';
import { removeToken } from '../../services/token';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/user-store';
import { getUsername, removeUsername } from '../../services/user';
import { customFetch } from '../../services/fetch';
import DeleteAccountModal from '../delete-account-modal';

const SideBar = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [image, setImage] = useState('');

  const { colorMode, toggleColorMode } = useColorMode();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [contactsModalOpen, setContactsModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const colorModeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

  const handleLogout = () => {
    removeToken();
    removeUsername();
    setUser(null);
    navigate('/login');
  };

  const handleGetProfile = async () => {
    const username = getUsername();
    const { ok, body } = await customFetch({
      url: `/api/users/${username}`,
      method: 'GET',
    });

    if (ok) {
      const { ID, Firstname, Lastname, Image, Username } = body;
      setFirstname(Firstname);
      setLastname(Lastname);
      setImage(Image);

      // update the store as well
      setUser({
        id: ID,
        username: Username,
        firstname: Firstname,
        lastname: Lastname,
        image: Image,
      });
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

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
      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
      />

      <Menu>
        <MenuButton>
          <Avatar
            name={`${firstname} ${lastname}`}
            src={image || ''}
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={() => setDeleteAccountModalOpen(true)}>
              Delete account
            </MenuItem>
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
