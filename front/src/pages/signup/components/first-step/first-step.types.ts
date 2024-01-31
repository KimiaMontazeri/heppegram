export type Payload = {
  username: string;
  password: string;
};

export type FirstStepProps = {
  handleContinue: () => void;
  handleSetPayload: (payload: Payload) => void;
};
