export interface MailerOptionsInterface {
  to: string | string[];
  subject: string;
  template?: string;
  context?: any;
  text?: string;
}
