"use client";

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MailPreviewView from '@/components/mail/MailPreviewView';
import { VAKScores } from '@/lib/vakData';

const SAMPLE_SCORES: VAKScores = {
  V: 14,
  A: 12,
  K: 10,
};

const toDominantType = (value: string | null): 'V' | 'A' | 'K' | 'balanced' => {
  const normalized = (value ?? '').toLowerCase();
  if (normalized === 'v') return 'V';
  if (normalized === 'a') return 'A';
  if (normalized === 'k') return 'K';
  return 'balanced';
};

export default function PreviewPage() {
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
      scores={SAMPLE_SCORES}
      onClose={() => router.push('/')}
      onRestart={() => router.push('/')}
    />
  );
}
