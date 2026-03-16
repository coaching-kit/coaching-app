"use client";

import { useRouter } from 'next/navigation';
import MailPreviewView from '@/components/mail/MailPreviewView';

export default function PreviewPage() {
  const router = useRouter();

  return (
    <MailPreviewView
      name="つぶ"
      onClose={() => router.push('/')}
      onRestart={() => router.push('/')}
    />
  );
}
