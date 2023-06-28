import React, { useRef } from 'react';
interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  isFocus?: boolean 
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = 'text',
  onChange,
  disabled,
  label,
  isFocus
}) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  if (isFocus) {
    inputRef.current?.focus()
  }
  return (
    <div className='w-full select-none '>
      {label && (
        <p className='text-xl text-white font-semibold mb-2'>{label}</p>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        ref={inputRef}
        className='
            w-full
            min-h-[34px]
            text-sm 
            bg-black 
            rounded-md
            outline-none
            text-white
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:border-transparent
            focus:outline-none
            dark:bg-white
            dark:text-black
            dark:border-none
            
          '
      />
    </div>
  )
}

export default Input
