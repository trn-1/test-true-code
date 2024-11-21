import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import cls from './ProductPage.module.scss';

import { ProductCard } from '@/entities/Product';
import { productApi } from '@/entities/Product/api/productApi';
import { makeQueryClient } from '@/shared/api/makeQueryClient';
import { Page } from '@/shared/ui/Page';

export const ProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const queryClient = makeQueryClient();

  queryClient.prefetchQuery(productApi.getProduct(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page className={cls.ProductPage}>
        <ProductCard id={id}/>
      </Page>
    </HydrationBoundary>
  );
};
