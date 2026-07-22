const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/{admin_email}';
const ADDITIONAL_RECIPIENTS = ['info@moonaesthetic.in', 'moonaesthetic001@gmail.com'];

type FormSubmitValue = string | number | boolean | null | undefined;

export type FormSubmissionData = Record<string, FormSubmitValue>;

export interface FormSubmitResponse {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

export async function sendFormSubmission(data: FormSubmissionData): Promise<FormSubmitResponse> {
  const payload = {
    ...data,
    _cc: ADDITIONAL_RECIPIENTS.join(','),
    _template: 'table',
  };

  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Unable to send your request right now. Please try again.');
  }

  return result;
}
