import { Box, useRadio } from '@chakra-ui/react';
import { PersonCardProps } from './person-card.types';

const PersonCard = ({ children }: PersonCardProps) => {
  const { getInputProps, getRadioProps } = useRadio();

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        // px={5}
        // py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PersonCard;
