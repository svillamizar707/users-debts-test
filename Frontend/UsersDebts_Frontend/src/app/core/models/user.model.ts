import { Debt } from './debt.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  phoneNumber?: string;
  debts?: Debt[];
}
