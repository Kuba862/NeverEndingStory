import { CONTACT } from "@/data/site";

/** Docelowy adres, na który ma trafiać formularz. */
export const CONTACT_FORM_RECIPIENT = CONTACT.email;

export class ContactFormNotConfiguredError extends Error {
  constructor() {
    super("Wysyłka formularza nie jest jeszcze skonfigurowana.");
    this.name = "ContactFormNotConfiguredError";
  }
}

/**
 * @param {{firstName: string, lastName: string, phone: string, message: string}} payload
 * @returns {Promise<void>}
 */
export async function sendContactMessage(payload) {
  void payload;
  throw new ContactFormNotConfiguredError();
}
