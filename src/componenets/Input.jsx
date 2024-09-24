import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref) {

    const id = useId()
    return (
        <div className="w-full">
            {/* if label is present */}
            {label && <label
                className='block mb-1'
                htmlFor={id}>
                {label}
                
            </label>}

            <input type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {/* id of label and input will be same so whenever click on label then focus will go to its input field */}
        </div>
    )
})

export default Input