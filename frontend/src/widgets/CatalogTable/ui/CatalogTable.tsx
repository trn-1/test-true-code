'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import cls from './CatalogTable.module.scss';

import { Product } from '@/entities/Product';
import { productApi } from '@/entities/Product/api/productApi';
import { CreateProductModal } from '@/features/CreateProductModal';
import { PAGE_SIZE } from '@/shared/const/constants';
import { classNames, formatNumberToTriads } from '@/shared/lib';
import { DebouncedInput } from '@/shared/ui/DebouncedInput';
import { Portal } from '@/shared/ui/Portal';
import { Spinner } from '@/shared/ui/Spinner';

export const CatalogTable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [sortKey, setSortKey] = useState(searchParams.get('sortKey'));
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection'));
  const [searchString, setSearchString] = useState(searchParams.get('searchString') ?? '');
  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);

  const [openModal, setOpenModal] = useState(false);

  const getQueryParams = useCallback(() => {
    const params = new URLSearchParams();

    if (sortKey && sortDirection) {
      params.set('sortKey', sortKey);
      params.set('sortDirection', sortDirection);
    }

    if (searchString) {
      params.set('searchString', searchString);
    }

    if (page) {
      params.set('page', page.toString());
    }

    return params.toString();
  }, [page, searchString, sortDirection, sortKey]);

  const { data: catalog, isPending, error, refetch } = useQuery(productApi.getFilteredProducts(searchParams.toString()));

  useEffect(() => {
    if (searchParams.toString() === getQueryParams().toString()) {
      return;
    }
    router.push(`/catalog?${getQueryParams().toString()}`);
  }, [getQueryParams, router, searchParams]);

  useEffect(() => {
    refetch();
  }, [ refetch ]);

  if (isPending) {
    return (
      <Spinner className={cls.spinner}/>
    );
  }

  if (error) {
    return (
      <div>Error!</div>
    );
  }

  const { data, totalCount } = catalog;

  if (!data) {
    return (
      <div>Error!</div>
    );
  }

  const maxPage = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;

  const prevPageBtnIsActive = !!totalCount && !!page && page !== 1;
  const nextPageBtnIsActive = !!totalCount && !!page && page !== maxPage;

  const handleSort = (id: keyof Product) => {
    if (sortKey !== id || !sortDirection) {
      setSortKey(id);
      setSortDirection('asc');
      return;
    }

    if (sortDirection === 'asc') {
      setSortDirection('desc');
      return;
    }

    setSortKey(null);
    setSortDirection(null);
  };

  const handleChangePage = (direction: 'next' | 'prev') => {
    const actualPage = page ?? 1;

    const pageNumber = direction === 'next' ? actualPage + 1 : actualPage - 1;

    if (pageNumber < 1) {
      setPage(1);
      return;
    }

    if (pageNumber > maxPage) {
      setPage(maxPage);
      return;
    }

    setPage(pageNumber);
  };

  const handleSearchString = (text: string) => {
    setSearchString(text);
    setPage(1);
  };

  const headerColumns: {
    id: keyof Product;
    title: string;
    canSort?: boolean;
  }[] = [
    {
      id: 'title',
      title: 'Наименование',
    },
    {
      id: 'price',
      title: 'Цена',
      canSort: true
    },
    {
      id: 'discount',
      title: 'Скидка',
      canSort: true
    },
    {
      id: 'description',
      title: 'Описание',
    },
    {
      id: 'article',
      title: 'Артикул',
    },
  ];

  const renderCreateProductModal = () => {
    if (!openModal) {
      return null;
    }

    return (
      <Portal>
        <CreateProductModal
          onClose={() => {
            refetch();
            setOpenModal(false);
          }}
        />
      </Portal>
    );
  };

  return (
    <div className={cls.CatalogTable}>
      {renderCreateProductModal()}
      <div className={cls.panel}>
        <DebouncedInput
          placeholder='Поиск...'
          value={searchString}
          onChange={handleSearchString}
          debounce={1000}
        />
        <button
          type='button'
          onClick={() => setOpenModal(!openModal)}
          className={classNames(cls.pageButton, {}, [ cls.buttonActive ])}
        >Создать продукт
        </button>
      </div>
      <table>
        <thead className={cls.header}>
          <tr>
            {
              headerColumns.map(({ id, title, canSort }) => (
                <th
                  key={title}
                  onClick={() => canSort && handleSort(id)}
                  className={classNames(cls.headerCell, { [cls.canSort]: canSort }, [])}
                >
                  {title} {canSort && sortKey === id && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
              ))
            }
          </tr>
        </thead>
        {
          totalCount ? (<tbody className={cls.tbody}>
            {
              data?.map(({ id, title, description, price, discount, article }) => (
                <tr
                  key={id}
                  className={cls.row}
                  onClick={() => {
                    router.push(`/product/${id}`);
                  }}
                >
                  <td>{title}</td>
                  <td>{formatNumberToTriads(price)}</td>
                  <td>{discount ? formatNumberToTriads(discount) : ''}</td>
                  <td>{description}</td>
                  <td>{article}</td>
                </tr>
              ))
            }
          </tbody>) : 'Товары не найдены'
        }
      </table>
      <div>
        <button
          onClick={() => handleChangePage('prev')}
          className={classNames(cls.pageButton, { [cls.buttonActive]: prevPageBtnIsActive })}
          disabled={!prevPageBtnIsActive}
        >
          Предыдущая страница
        </button>
        <button
          onClick={() => handleChangePage('next')}
          className={classNames(cls.pageButton, { [cls.buttonActive]: nextPageBtnIsActive })}
          disabled={!nextPageBtnIsActive}
        >
          Следующая страница
        </button>
      </div>

      <div className={cls.pageNumber}>
        <p>
          Найдено: {totalCount}
        </p>
        <p>
          Страница: {page ?? 1} / {maxPage}
        </p>
      </div>
    </div>
  );
};
