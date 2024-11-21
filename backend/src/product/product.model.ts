import { Product } from '@prisma/client';

export interface QueryParams {
  page?: string;
  sortKey?: string;
  searchString?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface Catalog {
  data: Product[];
  totalCount: number;
}
