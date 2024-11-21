import {
  useCallback,
  useEffect,
  useState,
  type InputHTMLAttributes,
} from 'react';

import cls from './DebouncedInput.module.scss';

import { useDebounce } from '@/shared/lib';

interface DebouncedInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  debounce?: number;
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 1000,
  ...props
}: DebouncedInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(() => {
    if (value === initialValue) {
      return;
    }
    onChange(value);
  }, [initialValue, onChange, value]);

  const debouncedHandleChange = useDebounce(handleChange, debounce);

  useEffect(() => {
    debouncedHandleChange();
  }, [ debouncedHandleChange ]);

  const input = (
    <div className={cls.field}>
      <input
        {...props}
        className={cls.input}
        type='text'
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );

  return <div className={cls.wrapper}>{input}</div>;
};
