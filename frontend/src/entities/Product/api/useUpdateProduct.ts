import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productApi } from './productApi';

import { Product } from '../model/types/product';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: productApi.updateProduct,
    onMutate: async updatingProduct => {
      await queryClient.cancelQueries({
        queryKey: [ productApi.baseKey ]
      });

      return updatingProduct;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ productApi.baseKey ]
      });
    }
  });

  const updateProduct = (data: Partial<Product> & {id: Product['id']}) => {
    updateProductMutation.mutateAsync(data);
  };

  return {
    updateProduct
  };
}
