import {
  Center,
  Heading,
  Stack,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from '@chakra-ui/react';
import FirstStep from './components/first-step';
import SecondStep from './components/second-step';
import { useState } from 'react';
import type { Payload } from './components/first-step/first-step.types';

const STEPS = [{ title: 'Username & Password' }, { title: 'Account Info' }];

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: STEPS.length,
  });

  const handleNextStep = (payload: Payload) => {
    setUsername(payload.username);
    setPassword(payload.password);
  };

  // const handleLogin = () => {
  //   // TODO:
  //   // call /register
  //   // if error is related to username or password -> setActiveStep(1)
  // };

  return (
    <Center pt={16}>
      <Stack align='center' width='450px'>
        <Heading as='h1' size='xl'>
          Create Account
        </Heading>
        <Text pb={4}>Connect with your friends today!</Text>

        <Stepper index={activeStep} width='450px' pb={4}>
          {STEPS.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepNumber />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <StepTitle>{step.title}</StepTitle>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        {activeStep === 1 ? (
          <FirstStep
            handleContinue={() => setActiveStep(2)}
            handleSetPayload={handleNextStep}
          />
        ) : (
          <SecondStep handleContinue={() => console.log('done')} />
        )}
      </Stack>
    </Center>
  );
}

export default Signup;
