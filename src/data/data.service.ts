import { Injectable } from '@nestjs/common';
import axios from 'axios';

const blockstreamUrl = 'https://blockstream.info/api';

@Injectable()
export class DataService {
  async getData(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/block-height/1`);
    return response.data;
  }

  async getLatestBlockhash(): Promise<any> {
    const response = await axios.get(`${blockstreamUrl}/blocks/tip/hash`);
    return response.data;
  }
}
