import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, memo } from 'react';

import '../input/input.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (valeu: string) => void;
  autofocus?: boolean;
}
export const Input = memo((props: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    className,
    type = 'type',
    value,
    onChange,
    placeholder,
    autofocus,
    ...otherProps
  } = props;

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="input-container">
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className="inputField"
      />
    </div>
  );
});
export default Input;
