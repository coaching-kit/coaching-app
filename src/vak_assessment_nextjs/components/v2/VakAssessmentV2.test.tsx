import { fireEvent, render, screen } from '@testing-library/react';
import { VAK_QUESTIONS } from '@/lib/vakData';
import VakAssessmentV2 from './VakAssessmentV2';

describe('VakAssessmentV2', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/v2/?free20=0030005');
    window.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
  });

  const completeAssessment = (scoreForType: (type: 'V' | 'A' | 'K') => number) => {
    render(<VakAssessmentV2 initialStarted />);

    VAK_QUESTIONS.forEach((question) => {
      const score = scoreForType(question.type);
      const optionLabel = [
        '',
        '全く当てはまらない',
        'やや当てはまらない',
        'どちらとも言えない',
        'やや当てはまる',
        'とても当てはまる',
      ][score];

      fireEvent.click(screen.getByRole('button', { name: new RegExp(`${optionLabel}\\s*${score}`) }));
    });
  };

  const submitReportForm = () => {
    fireEvent.change(screen.getByPlaceholderText('お名前'), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@mail.com'), {
      target: { value: 'test@example.com' },
    });

    const form = document.querySelector('form');
    if (!form) throw new Error('メール送信用フォームが見つかりません');

    fireEvent.submit(form);
    return form;
  };

  const expectReportFormResult = (expectedFree21: 'v' | 'a' | 'k' | 'b') => {
    const form = submitReportForm();
    const free20Input = document.querySelector('#V2Userfree20') as HTMLInputElement | null;
    const free21Input = document.querySelector('#V2Userfree21') as HTMLInputElement | null;

    expect(free20Input?.value).toBe('0030005');
    expect(free21Input?.value).toBe(expectedFree21);
    expect(form.getAttribute('action')).toBe(
      `https://pro-coach.net/p/r/IXjDgtEf?free20=0030005&free21=${expectedFree21}`,
    );
  };

  it('起動画面からfree20を保持したまま質問画面へ進む', async () => {
    render(<VakAssessmentV2 />);

    expect(screen.getByRole('heading', { name: /コミュニケーションタイプ診断/ })).toBeTruthy();
    expect(screen.queryByText(/質問 1 \/ 12/)).toBeNull();

    fireEvent.click(screen.getByRole('link', { name: '診断をはじめる' }));

    expect(await screen.findByText(/質問 1 \/ 12/)).toBeTruthy();
    expect(window.location.pathname).toBe('/v2/questions/');
    expect(window.location.search).toBe('?free20=0030005');
  });

  it('回答すると次の質問へ進む', async () => {
    render(<VakAssessmentV2 initialStarted />);

    fireEvent.click(screen.getByRole('button', { name: /やや当てはまる\s*4/ }));

    expect(await screen.findByText(/質問 2 \/ 12/)).toBeTruthy();
  });

  it.each([
    ['V', 'v'],
    ['A', 'a'],
    ['K', 'k'],
  ] as const)('%s型の診断結果をメールフォームに渡せる', async (dominantType, expectedFree21) => {
    completeAssessment((questionType) => (questionType === dominantType ? 5 : 1));

    expect(await screen.findByText('診断結果をメールで受け取る')).toBeTruthy();
    expectReportFormResult(expectedFree21);
  });

  it('バランス型の診断結果をメールフォームに渡せる', async () => {
    completeAssessment(() => 3);

    expect(await screen.findByText('診断結果をメールで受け取る')).toBeTruthy();
    expectReportFormResult('b');
  });
});
