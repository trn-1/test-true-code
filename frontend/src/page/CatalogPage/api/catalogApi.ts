import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { Product } from '@/entities/Product';
import { apiInstance } from '@/shared/api/apiInstance';

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export const catalogApi = {
  baseKey: 'catalog',
  baseUrl: '/catalog',
  getCatalog: (queryParams?: string) => {
    return queryOptions({
      queryKey: [catalogApi.baseKey, 'list', queryParams],
      queryFn: meta => apiInstance<PaginatedResult<Product>>(`${catalogApi.baseUrl}${queryParams || ''}`, {
        signal: meta.signal
      })
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [catalogApi.baseKey, 'list'],
      queryFn: meta =>
        apiInstance<PaginatedResult<Product>>(
          `${catalogApi.baseUrl}?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal
          }
        ),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  },

  createTodo: (data: Omit<Product, 'id'>) => {
    return apiInstance<Product>('/tasks', {
      method: 'POST',
      json: data
    });
  },
  updateTodo: (data: Product) => {
    return apiInstance<Product>(`${catalogApi.baseUrl}/${data.id}`, {
      method: 'PATCH',
      json: data
    });
  },
  deleteTodo: (id: string) => {
    return apiInstance(`${catalogApi.baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }
};
