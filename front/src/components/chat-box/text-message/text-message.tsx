import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

const TextMessage = ({ children }: { children: ReactNode }) => {
  return (
    <Box bgColor='ButtonFace' borderRadius='lg' p={2} px={3} textAlign='start'>
      {children}
    </Box>
  );
};

export default TextMessage;
