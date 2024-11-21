import { queryOptions } from '@tanstack/react-query';

import { Product } from '@/entities/Product';
import { apiInstance } from '@/shared/api/apiInstance';

export const productApi = {
  baseKey: 'products',
  baseUrl: '/products',
  getFilteredProducts: (queryParams?: string) => {
    const params = queryParams ? queryParams.toString() : '';

    return queryOptions({
      queryKey: [productApi.baseKey, params],
      queryFn: (meta) => apiInstance<{ data: Product[]; totalCount: number; }>(`${productApi.baseUrl}?${params}`, {
        signal: meta.signal,
      }),
    });
  },

  getProduct: (id: Product['id']) => {
    return queryOptions({
      queryKey: [productApi.baseKey, id],
      queryFn: (meta) => apiInstance<Product>(`${productApi.baseUrl}/${id}`, {
        signal: meta.signal,
      }),
    });
  },
  createProduct: (data: Omit<Product, 'id'>) => {
    return apiInstance<Product>(`${productApi.baseUrl}`, {
      method: 'POST',
      json: data,
    });
  },
  updateProduct: (data: Partial<Product> & {id: Product['id']}) => {
    return apiInstance<Product>(`${productApi.baseUrl}/${data.id}`, {
      method: 'PATCH',
      json: data,
    });
  },
  deleteProduct: (id: Product['id']) => {
    return apiInstance(`${productApi.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  },
};
