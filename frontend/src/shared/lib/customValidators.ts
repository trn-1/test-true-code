import { regExpEmail } from './regExp';

export const emailValidator = (value: string): boolean => {
  return regExpEmail.test(String(value));
};
