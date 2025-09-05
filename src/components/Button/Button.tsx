import { ButtonHTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './styles.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo((props: Props) => {
  const { children, className, ...rest } = props;

  return <button className={cn(styles.button, className)} {...rest}>{children}</button>;
});

Button.displayName = 'Button';
