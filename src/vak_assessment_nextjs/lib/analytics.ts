type GtagCommand = 'config' | 'event' | 'js';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, targetId: string | Date, params?: Record<string, unknown>) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, params);
}

export function trackVakAssessmentStart(free20: string) {
  trackEvent('vak_assessment_start', {
    free20,
    tool_version: 'v2',
  });
}

export function trackVakResult(resultType: string, free20: string) {
  trackEvent('vak_assessment_result', {
    result_type: resultType,
    free20,
    tool_version: 'v2',
  });
}

export function trackVakReportSubmit(resultType: string, free20: string) {
  trackEvent('vak_report_submit', {
    result_type: resultType,
    free20,
    tool_version: 'v2',
  });
}
