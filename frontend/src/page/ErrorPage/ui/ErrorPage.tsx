import { Page } from '@/shared/ui/Page';

import cls from './ErrorPage.module.scss';

import type { JSX } from 'react';

export const ErrorPage = (): JSX.Element => {
  return (
    <Page className={cls.ErrorPage}>
      <h1>Ошибка оплаты</h1>
      <h2>Попробуйте повторить операцию</h2>
    </Page>
  );
};
