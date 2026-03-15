"use client";

import type { FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const getFree20FromSearch = (search: string): string => {
  const params = new URLSearchParams(search);
  return (params.get('free20') ?? '').trim();
};

interface Props {
  name: string;
  email: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  status: Status;
  diagnosisResult: 'V' | 'A' | 'K' | 'balanced';
}

export default function MailEntryForm({ name, email, setName, setEmail, status, diagnosisResult }: Props) {
  const free20Value = typeof window !== 'undefined'
    ? getFree20FromSearch(window.location.search)
    : '';
  const free21Value = diagnosisResult === 'balanced' ? 'b' : diagnosisResult.toLowerCase();
  const formAction = `https://pro-coach.net/p/r/IXjDgtEf?free20=${encodeURIComponent(free20Value)}&free21=${encodeURIComponent(free21Value)}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!name.trim() || !email.includes('@')) {
      event.preventDefault();
      return;
    }

    const currentFree20 = getFree20FromSearch(window.location.search);
    const currentFree21 = diagnosisResult === 'balanced' ? 'b' : diagnosisResult.toLowerCase();
    const form = event.currentTarget;

    const free20Input = form.querySelector('#Userfree20') as HTMLInputElement | null;
    const free21Input = form.querySelector('#Userfree21') as HTMLInputElement | null;
    const refererFormUrlInput = form.querySelector('#UserRefererFormUrl') as HTMLInputElement | null;
    const refererUrlInput = form.querySelector('#UserRefererUrl') as HTMLInputElement | null;
    if (free20Input) free20Input.value = currentFree20;
    if (free21Input) free21Input.value = currentFree21;
    if (refererFormUrlInput) refererFormUrlInput.value = window.location.href;
    if (refererUrlInput) refererUrlInput.value = document.referrer;

    form.action = `https://pro-coach.net/p/r/IXjDgtEf?free20=${encodeURIComponent(currentFree20)}&free21=${encodeURIComponent(currentFree21)}`;
  };

  return (
    <>
      {status === 'idle' && (
        <form
          action={formAction}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          id="UserItemForm"
          method="post"
          acceptCharset="utf-8"
          className="w-full max-w-md flex flex-col gap-3 items-center"
        >
          <input
            type="text"
            name="data[User][name1]"
            id="Username1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="お名前"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="data[User][mail]"
            id="Usermail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input name="data[User][free9]" type="hidden" id="Userfree9" value="" readOnly />
          <input name="data[User][free20]" type="hidden" id="Userfree20" value={free20Value} readOnly />
          <input name="data[User][free21]" type="hidden" id="Userfree21" value={free21Value} readOnly />
          <input type="hidden" id="server_url" value="https://pro-coach.net/" readOnly />
          <input type="hidden" name="data[User][referer_form_url]" id="UserRefererFormUrl" defaultValue="" />
          <input type="hidden" name="data[User][referer_url]" id="UserRefererUrl" defaultValue="" />

          <button
            type="submit"
            disabled={!name.trim() || !email.includes('@')}
            className="w-full bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            診断結果をメールで受け取る
          </button>
        </form>
      )}
    </>
  );
}
