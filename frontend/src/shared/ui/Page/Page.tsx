import { type ReactNode } from 'react';

import cls from './Page.module.scss';

import { classNames } from '@/shared/lib';

interface PageProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Page = ({ children, className, id }: PageProps):  JSX.Element => (
  <main id={id} className={classNames(cls.Page, {}, [ className ])}>{children}</main>
);
