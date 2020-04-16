import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
