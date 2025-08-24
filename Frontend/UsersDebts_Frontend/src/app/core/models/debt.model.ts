import { User } from './user.model';

export interface Debt {
  id: number;
  userId: number;
  user?: User;
  amount: number;
  description: string;
  isPaid: boolean;
  createdAt: string;
  paidAt?: string | null;
}
