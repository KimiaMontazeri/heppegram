import type { ReactNode } from 'react';

export type TextMessageProps = {
  children: ReactNode;
  direction: 'start' | 'end';
  showBubble: boolean;
};
