import {
  Box,
  Flex,
  Stack,
  Text,
  createIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { TextMessageProps } from './text-message.types';
import './text-message.css';

const BubbleIcon = createIcon({
  displayName: 'ChatBubbleIcon',
  viewBox: '0 0 1 1',
  path: (
    <svg viewBox='0 0 1 1'>
      <path
        fill='#2d3748'
        d='M1,0.897 V0 L0.912,0.21 C0.789,0.419,0.568,0.616,0.26,0.791 L0.064,0.902 C-0.021,0.951,0.095,1,0.236,0.997 L1,0.897'
      />
    </svg>
  ),
});

const TextMessage = ({
  children,
  direction,
  showBubble,
  timestamp = 12,
}: TextMessageProps) => {
  const grayColor = useColorModeValue('gray.100', 'gray.700');
  const grayTextColor = useColorModeValue('gray.500', 'gray.300');

  if (direction === 'start') {
    return (
      <Stack align='flex-start'>
        <Flex align='flex-end'>
          <Box
            bgColor={grayColor}
            borderRadius='lg'
            p={2}
            px={3}
            textAlign='start'
          >
            {children}
            <Text fontSize='xs' color={grayTextColor}>
              {timestamp}
            </Text>
          </Box>
          <BubbleIcon
            color='red.500'
            w={4}
            h={4}
            mb={1}
            visibility={!showBubble ? 'hidden' : 'visible'}
            className='bubble startBubble'
          />
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack align='flex-start'>
      <Flex align='flex-end'>
        <BubbleIcon
          color='red.500'
          w={4}
          h={4}
          mb={1}
          visibility={!showBubble ? 'hidden' : 'visible'}
          className='endBubble'
        />
        <Box
          bgColor={grayColor}
          borderRadius='lg'
          p={2}
          px={3}
          textAlign='start'
        >
          {children}
          <Text fontSize='xs' color={grayTextColor}>
            {timestamp}
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

export default TextMessage;
