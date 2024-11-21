import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { productApi } from '@/entities/Product/api/productApi';
import { makeQueryClient } from '@/shared/api/makeQueryClient';
import { CatalogTable } from '@/widgets/CatalogTable';

export const CatalogPage = async (): Promise<JSX.Element> => {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery(productApi.getFilteredProducts());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogTable />
    </HydrationBoundary>
  );
};
