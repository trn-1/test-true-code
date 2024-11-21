import { useMutation } from '@tanstack/react-query';

import { productApi } from './productApi';

import { Product } from '../model/types/product';

import { makeQueryClient } from '@/shared/api/makeQueryClient';

export function useCreateProduct() {
  const queryClient = makeQueryClient();

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ productApi.baseKey ]
      });
    }
  });

  const { mutateAsync, isPending, isSuccess } = createProductMutation;

  const createProduct = (data: Omit<Product, 'id'>) => {
    return mutateAsync(data);
  };

  return {
    createProduct,
    isPending,
    isSuccess
  };
}
