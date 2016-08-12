import { BucketItem } from './blitems';

export interface Bucketlist {
  id: number;
  list_name: string;
  items: BucketItem[];
  date_created: string;
  date_updated: string;
  user_id: string;

}