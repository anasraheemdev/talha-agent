import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'LabMind AI',
  description: 'AI-powered laboratory intelligence with OCR, GPT-4.1 analysis, and chat-enabled interpretation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
