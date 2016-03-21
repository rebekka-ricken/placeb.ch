import {Location} from './location'

export interface Box {
  box: {
    id: number;
    category: {
      id: number;
      title: string;
      type: string;
      durations: Array<any>;
      imageUrl: string;
      avgHeight: number;
      avgWidth: number;
      avgDepth: number;
      avgDeduction: number;
    }
    location: Location;
    boxId: string;
    boxStatus: string;
    height: number;
    width: number;
    depth: number;
    deduction: number;
    comment?: any;
    created: string;
    updated: string;
  }
}
