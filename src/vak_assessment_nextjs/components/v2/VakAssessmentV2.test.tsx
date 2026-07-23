import { fireEvent, render, screen } from '@testing-library/react';
import VakAssessmentV2 from './VakAssessmentV2';

describe('VakAssessmentV2', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/v2/?free20=0030005');
    window.scrollTo = jest.fn();
  });

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
});
