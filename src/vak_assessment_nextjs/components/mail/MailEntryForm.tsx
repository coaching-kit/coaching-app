"use client";

import React from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  name: string;
  email: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  status: Status;
  onSend: () => void;
}

export default function MailEntryForm({ name, email, setName, setEmail, status, onSend }: Props) {
  return (
    <>
      {status === 'idle' && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="お名前"
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={onSend}
            disabled={!name.trim() || !email.includes('@')}
            className="w-full max-w-md bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            診断結果をメールで受け取る
          </button>
          <p className="text-xs text-gray-500 mt-1">↑テスト画面が表示されます（メールは配信されません）</p>
        </>
      )}
    </>
  );
}
