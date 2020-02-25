import {Similarity} from './similarity';

export interface HistoryItem {
  value: string;
  similarities: Similarity[];
  words: string[];
}
