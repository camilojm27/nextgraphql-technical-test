export type Transaction = {
  id: string; // UUID
  amount: number;
  description: string;
  userId: string;
  transactionDate: string; // Fecha real de la transacción
  createdAt: string; // Fecha donde es creado en la base de datos
  updatedAt: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

