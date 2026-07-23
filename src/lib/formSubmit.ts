export const FORMSUBMIT_EMAIL = 'info@moonaesthetic.in';
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;
export const FORMSUBMIT_FALLBACK_ENDPOINT = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;
export const FORMSUBMIT_NEXT_URL = 'https://moonaesthetic.in/contact';
export const FORMSUBMIT_AUTORESPONSE =
  'Thank you for contacting Moon Aesthetic. We have received your appointment request and our team will contact you shortly.';

const ADDITIONAL_RECIPIENTS = ['moonaesthetic001@gmail.com'];
export const FORMSUBMIT_CC = ADDITIONAL_RECIPIENTS.join(',');

export interface FormSubmitResponse {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

export function appendFormSubmitFields(formData: FormData, subject: string) {
  formData.set('_cc', FORMSUBMIT_CC);
  formData.set('_captcha', 'false');
  formData.set('_subject', subject);
  formData.set('_template', 'table');
  formData.set('_next', FORMSUBMIT_NEXT_URL);
  formData.set('_autoresponse', FORMSUBMIT_AUTORESPONSE);
}

export async function sendFormSubmission(formData: FormData): Promise<FormSubmitResponse> {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Unable to send your request right now. Please try again.');
  }

  return result as FormSubmitResponse;
}
