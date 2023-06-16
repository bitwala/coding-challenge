import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Transaction, TransactionStatus } from './data.types';

const blockstreamUrl = 'https://blockstream.info/api';

@Injectable()
export class DataService {
  async getFirstBlockHash(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/block-height/1`);
    return response.data;
  }

  async getLatestBlockhash(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/blocks/tip/hash`);
    return response.data;
  }

  // Transaction endpoints
  async getTransaction(txid: string): Promise<Transaction> {
    const response = await axios.get(`${blockstreamUrl}/tx/${txid}`);
    return response.data;
  }

  async getTransactionStatus(txid: string): Promise<TransactionStatus> {
    const response = await axios.get(`${blockstreamUrl}/tx/${txid}/status`);
    const transactionStatus: TransactionStatus = JSON.parse(response.data);
    return transactionStatus;
  }

  async getTransactionHex(txid: string): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/tx/${txid}/hex`);
    return response.data;
  }

  async getTransactionMerkleProof(txid: string): Promise<any> {
    const response = await axios.get(
      `${blockstreamUrl}/tx/${txid}/merkle-proof`,
    );
    return response.data;
  }

  async getTransactionOutspend(txid: string, vout: number): Promise<any> {
    const response = await axios.get(
      `${blockstreamUrl}/tx/${txid}/outspend/${vout}`,
    );
    return response.data;
  }

  async getTransactionOutspends(txid: string): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/tx/${txid}/outspends`);
    return response.data;
  }

  async postTransaction(hex: string): Promise<any> {
    const response = await axios.post(`${blockstreamUrl}/tx`, hex);
    return response.data;
  }

  // Address endpoints
  async getAddressInfo(address: string): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/address/${address}`);
    return response.data;
  }

  async getAddressTransactions(address: string): Promise<any> {
    const response = await axios.get(
      `${blockstreamUrl}/address/${address}/txs`,
    );
    return response.data;
  }

  async getAddressUTXO(address: string): Promise<any> {
    const response = await axios.get(
      `${blockstreamUrl}/address/${address}/utxo`,
    );
    return response.data;
  }

  // Block endpoints
  async getBlock(hash: string): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/block/${hash}`);
    return response.data;
  }

  async getBlockStatus(hash: string): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/block/${hash}/status`);
    return response.data;
  }

  async getBlockTransactions(hash: string, startIndex: number): Promise<any> {
    const response = await axios.get(
      `${blockstreamUrl}/block/${hash}/txs/${startIndex}`,
    );
    return response.data;
  }

  // Mempool endpoints
  async getMempool(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/mempool`);
    return response.data;
  }

  async getMempoolTxids(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/mempool/txids`);
    return response.data;
  }

  // Fee estimate endpoint
  async getFeeEstimates(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/fee-estimates`);
    return response.data;
  }
}