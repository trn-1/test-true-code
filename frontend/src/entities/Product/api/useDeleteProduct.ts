import { useMutation } from '@tanstack/react-query';

import { productApi } from './productApi';

import { Product } from '../model/types/product';

import { makeQueryClient } from '@/shared/api/makeQueryClient';

export function useDeleteProduct() {
  const queryClient = makeQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onMutate: () => {
      queryClient.cancelQueries({
        queryKey: [ productApi.baseKey ]
      });
    },
    onSettled: () => {
      queryClient.removeQueries();
    }
  });

  const { mutateAsync, isPending } = deleteProductMutation;

  const deleteProduct = (id: Product['id']) => {
    return mutateAsync(id);
  };

  return {
    deleteProduct,
    isPending
  };
}
