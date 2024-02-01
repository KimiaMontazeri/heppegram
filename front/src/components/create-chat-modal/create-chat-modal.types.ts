export type CreateChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type User = {
  firstname: string;
  lastname: string;
  username: string;
  image?: string;
};
