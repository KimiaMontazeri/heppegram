export type MessageGroupProps = {
  isFromMe: boolean;
  from: {
    name: string;
    photoUrl: string;
  };
  messages: string[];
};
