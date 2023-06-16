import { Resolver, Query, Args } from '@nestjs/graphql';
import { DataService } from '../data/data.service';
import {
  Block,
  BlockStatus,
  BlockTransactions,
  FeeEstimate,
  MempoolInfo,
  Transaction,
  TransactionStatus,
} from './data.types';

@Resolver('Data')
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query(() => String)
  async getFirstBlockHash() {
    return await this.dataService.getFirstBlockHash();
  }

  @Query(() => String)
  async getLatestBlockhash() {
    return await this.dataService.getLatestBlockhash();
  }

  @Query(() => Transaction)
  async getTransaction(@Args('txid') txid: string) {
    return await this.dataService.getTransaction(txid);
  }

  @Query(() => Block)
  async getBlock(@Args('hash') hash: string) {
    return await this.dataService.getBlock(hash);
  }

  @Query(() => TransactionStatus)
  async getTransactionStatus(@Args('txid') txid: string) {
    return await this.dataService.getTransactionStatus(txid);
  }

  @Query(() => BlockStatus)
  async getBlockStatus(@Args('hash') hash: string) {
    return await this.dataService.getBlockStatus(hash);
  }

  @Query(() => BlockTransactions)
  async getBlockTransactions(
    @Args('hash') hash: string,
    @Args('index') index: number,
  ) {
    return await this.dataService.getBlockTransactions(hash, index);
  }

  @Query(() => MempoolInfo)
  async getMempoolInfo() {
    return await this.dataService.getMempool();
  }

  @Query(() => [String])
  async getMempoolTxids() {
    return await this.dataService.getMempoolTxids();
  }

  @Query((returns) => [FeeEstimate])
  async getFeeEstimates() {
    const estimates = await this.dataService.getFeeEstimates();
    return Object.entries(estimates).map(
      ([confirmationTarget, estimatedFee]) => ({
        confirmationTarget: parseInt(confirmationTarget, 10),
        estimatedFee,
      }),
    );
  }
}
