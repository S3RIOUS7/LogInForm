import { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from 'react';
import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  buttonStyle: VariantButton;
}
type VariantButton = 'primary' | 'secondary' | 'buttonMenu' | 'logout';

const Button: FC<ButtonProps> = ({ children, buttonStyle, ...otherProps }): ReactElement => {
  const buttonClassName = `buttonContainer ${buttonStyle}`;

  return (
    <>
      <button className={buttonClassName} {...otherProps}>
        {children}
      </button>
    </>
  );
};

export default Button;
