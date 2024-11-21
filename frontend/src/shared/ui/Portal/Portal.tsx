import { type ReactNode } from 'react';
import { createPortal }   from 'react-dom';

interface IPortal {
	children?: ReactNode;
	element?: HTMLElement;
}

export const Portal = (props: IPortal): JSX.Element => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};
