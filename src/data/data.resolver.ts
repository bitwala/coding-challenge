import { Resolver, Query } from '@nestjs/graphql';
import { DataService } from '../data/data.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class HashData {
  @Field()
  hash: string;
}

@Resolver('Data')
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query((returns) => String)
  async getData() {
    return await this.dataService.getData();
  }

  @Query((returns) => String)
  async getLatestBlockhash() {
    return await this.dataService.getLatestBlockhash();
  }
}
