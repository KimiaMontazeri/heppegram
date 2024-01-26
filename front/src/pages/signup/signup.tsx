import {
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
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';

const STEPS = [{ title: 'Username & Password' }, { title: 'Account Info' }];

function Signup() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: STEPS.length,
  });

  // const handleLogin = () => {
  //   // TODO:
  //   // call /register
  //   // if error is related to username or password -> setActiveStep(1)
  // };

  return (
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
        <FirstStep handleContinue={() => setActiveStep(2)} />
      ) : (
        <SecondStep handleContinue={() => console.log('done')} />
      )}
    </Stack>
  );
}

export default Signup;
