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
    <div className="">
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
        className={`
                px-3 py-2 rounded-lg
                bg-white tetxt-black outline-none
                focus:bg-gray-50 duration-200 border border-gray-200 w-full
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
