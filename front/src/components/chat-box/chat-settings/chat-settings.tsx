import { SettingsIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import { ChatSettingsProps } from './chat-settings.types';

const ChatSettings = ({
  isAdmin = false,
  handleLeaveChat,
}: ChatSettingsProps) => {
  return (
    <Menu>
      <MenuButton>
        <IconButton variant='ghost' icon={<SettingsIcon />} aria-label='more' />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem color='red.500' onClick={handleLeaveChat}>
            Leave
          </MenuItem>
          {isAdmin && <MenuItem color='red.500'>Delete</MenuItem>}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default ChatSettings;
