import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'income') {
      const income = this.balance.income + transaction.value;
      const total = this.balance.total + transaction.value;

      this.balance.income = income;
      this.balance.total = total;
    } else {
      const outcome = this.balance.outcome + transaction.value;
      const total = this.balance.total - transaction.value;

      if (total < 0) {
        throw Error("You don't have sufficient funds");
      }

      this.balance.outcome = outcome;
      this.balance.total = total;
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
