import Link from 'next/link';

import cls from './NotFoundPage.module.scss';

import { Page } from '@/shared/ui/Page';

export const NotFoundPage = (): JSX.Element => {
  return (
    <Page className={cls.NotFoundPage}>

      <h1>Страница не существует</h1>
      <Link href='/'>На главную</Link>
    </Page>
  );
};
