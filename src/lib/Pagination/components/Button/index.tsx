import type { FC, JSXElementConstructor, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  Label: JSXElementConstructor<Record<string, never>> | string;
};
const Button: FC<Props> = ({ Label, ...props }) => {
  return <button {...props}>{typeof Label === 'string' ? Label : <Label />}</button>;
};

export default Button;
