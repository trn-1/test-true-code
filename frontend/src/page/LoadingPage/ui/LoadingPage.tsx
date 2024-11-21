import { Page } from '@/shared/ui/Page';
import { Spinner } from '@/shared/ui/Spinner';

import cls from './LoadingPage.module.scss';

export const LoadingPage = (): JSX.Element => {
  return (
    <Page className={cls.LoadingPage}>
      <Spinner className={cls.spinner} />
    </Page>
  );
};
