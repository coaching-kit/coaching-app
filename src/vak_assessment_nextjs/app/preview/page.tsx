"use client";

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MailPreviewView from '@/components/mail/MailPreviewView';

const toDominantType = (value: string | null): 'V' | 'A' | 'K' | 'balanced' => {
  const normalized = (value ?? '').toLowerCase();
  if (normalized === 'v') return 'V';
  if (normalized === 'a') return 'A';
  if (normalized === 'k') return 'K';
  return 'balanced';
};

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dominantType = useMemo(
    () => toDominantType(searchParams.get('type')),
    [searchParams]
  );

  return (
    <MailPreviewView
      name="つぶ"
      dominantType={dominantType}
      onClose={() => router.push('/')}
      onRestart={() => router.push('/')}
    />
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <PreviewContent />
    </Suspense>
  );
}
