import { Resolver, Query, Args } from '@nestjs/graphql';
import { DataService } from '../data/data.service';
import {
  AddressInfo,
  AddressTransactions,
  Block,
  BlockStatus,
  BlockTransactions,
  FeeEstimate,
  MempoolInfo,
  Outspend,
  Transaction,
  TransactionStatus,
  TxMerkleProof,
  Utxo,
} from './data.types';

@Resolver('Data')
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query(() => String)
  async getFirstBlockHash() {
    return await this.dataService.getFirstBlockHash();
  }

  @Query(() => String)
  async getLatestBlockHash() {
    return await this.dataService.getLatestBlockhash();
  }

  @Query(() => Transaction)
  async getTransaction(@Args('txid') txid: string) {
    return await this.dataService.getTransaction(txid);
  }

  @Query(() => TransactionStatus)
  async getTransactionStatus(@Args('txid') txid: string) {
    return await this.dataService.getTransactionStatus(txid);
  }

  //getTransactionMerkleProof
  @Query(() => TxMerkleProof)
  async getTransactionMerkleProof(@Args('txid') txid: string) {
    return await this.dataService.getTransactionMerkleProof(txid);
  }

  //getTransactionOutspend
  @Query(() => Outspend)
  async getTransactionOutspend(
    @Args('txid') txid: string,
    @Args('vout') vout: number,
  ) {
    return await this.dataService.getTransactionOutspend(txid, vout);
  }

  //getTransactionOutspends
  @Query(() => [Outspend])
  async getTransactionOutspends(@Args('txid') txid: string) {
    return await this.dataService.getTransactionOutspends(txid);
  }

  @Query(() => String)
  async getTransactionHex(@Args('txid') txid: string) {
    return await this.dataService.getTransactionHex(txid);
  }

  //no need for postTransaction

  // Address Resolvers

  // getAddressInfo
  @Query(() => AddressInfo)
  async getAddressInfo(@Args('address') address: string) {
    return await this.dataService.getAddressInfo(address);
  }

  // getAddressTransactions
  @Query(() => [AddressTransactions])
  async getAddressTransactions(@Args('address') address: string) {
    return await this.dataService.getAddressTransactions(address);
  }

  // getAddressUtxos
  @Query(() => Utxo)
  async getAddressUtxos(@Args('address') address: string) {
    return await this.dataService.getAddressUTXO(address);
  }

  // Block Resolvers

  @Query(() => Block)
  async getBlock(@Args('hash') hash: string) {
    return await this.dataService.getBlock(hash);
  }

  @Query(() => BlockStatus)
  async getBlockStatus(@Args('hash') hash: string) {
    return await this.dataService.getBlockStatus(hash);
  }

  @Query((returns) => [BlockTransactions])
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
