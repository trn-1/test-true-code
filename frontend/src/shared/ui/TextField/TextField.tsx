import { type InputHTMLAttributes } from 'react';

import cls from './TextField.module.scss';

import { classNames } from '@/shared/lib';

export type THTMLInput = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size' | 'type'
>;

export type TTextFieldType = 'text' | 'password' | 'tel' | 'email' | 'number';

export type TTextFieldSize = 'medium' | 'large';

export type TTextFieldWidth = 'half' | '75' | 'full';

export type TTextFieldState = 'idle' | 'error' | 'disabled';
export interface ITextField extends THTMLInput {
  value: string;
  errorMessage?: string;
  type?: TTextFieldType;
  size?: TTextFieldSize;
  width?: TTextFieldWidth;
  state?: TTextFieldState;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = (props: ITextField): JSX.Element => {
  const {
    value,
    type = 'text',
    placeholder,
    size = 'large',
    width = 'full',
    state = 'idle',
    className = '',
    maxLength = 50,
    errorMessage,
    onChange = () => {},
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value, e);
  };

  const disabledState = state === 'disabled';

  const wrapperMods = [
    cls.wrapper,
    cls[`wrapper--${width}`]
  ];

  const inputMods = [cls.input, cls[`input--${size}`]];

  const textFieldMods = [
    cls.textField,
    cls[`textField--${size}`],
    cls[`textField--${state}`],
  ];

  const bottomText = (): JSX.Element | undefined => {
    if (!errorMessage) {
      return;
    }

    return <span className={cls.bottomText}>{errorMessage}</span>;
  };

  const input = (
    <div className={classNames('', {}, textFieldMods)}>
      <input
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={classNames('', {}, inputMods)}
        placeholder={disabledState ? '' : placeholder}
        disabled={disabledState}
        maxLength={maxLength}
      />
    </div>
  );

  return (
    <div className={classNames(className, {}, wrapperMods)}>
      {input}
      {bottomText()}
    </div>
  );
};
