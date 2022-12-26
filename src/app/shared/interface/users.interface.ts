export interface User {
  id?: string;
  schema?: string;
  name: string;
  email: string;
  enable?: boolean;
  acceptedTerms?: boolean;
  createdAt?: Date;
  updatedAt?: string;
}
