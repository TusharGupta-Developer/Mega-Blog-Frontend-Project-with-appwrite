import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "", // u can use className alone without(= "") when className is not empty. Recommended:You can also use className="" there is no problem with this. 
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select {...props} id= {id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => ( //if options have then only map should happen
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>

    )
}

export default React.forwardRef(Select) //In Input componenet, we wraped its function when it was created. But, here we do when exporting the function, which makes code easy. 