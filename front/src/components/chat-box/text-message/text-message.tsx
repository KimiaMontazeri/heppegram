import type { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const TextMessage = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      bgColor={useColorModeValue('gray.100', 'gray.700')}
      borderRadius='lg'
      p={2}
      px={3}
      textAlign='start'
    >
      {children}
    </Box>
  );
};

export default TextMessage;
