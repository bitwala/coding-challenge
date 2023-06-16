import { Resolver, Query, Args } from '@nestjs/graphql';
import { DataService } from '../data/data.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class HashData {
  @Field()
  hash: string;
}

@ObjectType()
export class TransactionStatus {
  @Field()
  confirmed: boolean;

  @Field({ nullable: true })
  block_height: number;

  @Field({ nullable: true })
  block_hash: string;
}
@ObjectType()
export class Transaction {
  @Field()
  txid: string;

  @Field()
  version: number;

  @Field()
  locktime: number;

  @Field()
  size: number;

  @Field()
  weight: number;

  @Field()
  fee: number;

  // Assuming vin and vout as arrays of strings
  @Field((type) => [String])
  vin: string[];

  @Field((type) => [String])
  vout: string[];

  // Status can be a nested object
  @Field((type) => TransactionStatus)
  status: TransactionStatus;
}

@ObjectType()
export class BlockStatus {
  @Field()
  in_best_chain: boolean;

  @Field({ nullable: true })
  next_best: string;
}
@ObjectType()
export class Block {
  @Field()
  id: string;

  @Field()
  height: number;

  @Field()
  version: number;

  @Field()
  timestamp: number;

  @Field()
  tx_count: number;

  @Field()
  size: number;

  @Field()
  weight: number;

  @Field()
  merkle_root: string;

  @Field((type) => BlockStatus)
  status: BlockStatus;
}

@ObjectType()
export class MempoolInfo {
  @Field()
  count: number;

  @Field()
  vsize: number;

  @Field()
  total_fee: number;

  @Field((type) => [[Number]])
  fee_histogram: number[][];
}

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

  @Query(() => MempoolInfo)
  async getMempoolInfo() {
    return await this.dataService.getMempool();
  }
}
