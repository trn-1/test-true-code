import { classNames } from '@/shared/lib';

import cls from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps): JSX.Element => {
  return (
    <div className={classNames(cls.Spinner, {}, [ className ])}>
      <svg viewBox='25 25 50 50'>
        <circle cx='50' cy='50' r='20' />
      </svg>
    </div>
  );
};
