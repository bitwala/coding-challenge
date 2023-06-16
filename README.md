<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://userimg-assets.customeriomail.com/images/client-env-65797/1685522835841_Logo_mandarin_01H1RFTTFWVB00G2D2DK3NKD2Y.png" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

To get started run `docker-compose up -d`

Server should start up and a GraphQL Playground should be available under `localhost:3000/graphql` 

On the right hand site you can find _Docs_ about available queries as well as the _Schema_, which you can download or copy to use in your frontend.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


# GraphQL

## Example Queries

```GraphQL
{getBlockTransactions(hash: "00000000000000000000c46287836d6018f1e6b2c02e33bd60e5c0681bcfe211",index: 50){
  txid
  fee
  vout {
    value
  }
  status {
    block_hash
  }
}}
```

```GraphQL
{getTransaction(txid:"27ed44d37b0e0a30d8c85c85a8cf6e7bf632207130a4447932ce057646f2e1de"){
	txid
  version
  locktime
  size
  weight
  fee
  vin {
    txid
    vout
  }
  vout {
    value
  }
  status {
    confirmed
    block_height
    block_hash
    block_time
  }
}}
```
