import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
  {
    label,
    type = 'text',
    inputClassName = '',
    labelClassName = '',
    id,
    accept = '',
    onChange,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id || generatedId
  return (
    <div className="h-10 w-full flex gap-3 items-center">
      {label && (
        <label
          className={`${labelClassName}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        accept={accept}
        className={`rounded-sm
                bg-white text-black h-8 indent-2  
                focus:bg-gray-50 duration-200 border border-gray-200 flex-1 
                ${inputClassName}`}
        ref={ref}
        id={inputId}
        onChange={onChange}
        {...props}
      />
    </div>
  )
})

export default Input
