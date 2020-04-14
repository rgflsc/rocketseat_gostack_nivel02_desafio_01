import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome: number = this.transactions.reduce(
      (totalValue, currentTransaction) =>
        currentTransaction.type === 'income'
          ? totalValue + currentTransaction.value
          : totalValue,
      0,
    );

    const totalOutcome: number = this.transactions.reduce(
      (totalValue, currentTransaction) =>
        currentTransaction.type === 'outcome'
          ? totalValue + currentTransaction.value
          : totalValue,
      0,
    );

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
