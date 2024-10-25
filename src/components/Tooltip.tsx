import * as React from 'react'
import classNames from 'classnames'

type tooltipProps = {
    children: React.ReactNode,
    position?: 'left' | 'right' | 'top' | 'bottom',
    title?: string,
}

export default function Tooltip({ children, position = 'bottom', title }: tooltipProps) {

    const tooltipClasses = classNames({
        'bottom-full mb-2': position.includes('top'),
        'top-full mt-2': position.includes('bottom'),
        'right-0 mr-auto': position.includes('left'),
        'left-0 ml-auto': position.includes('right'),
    });
    
    return (
        <div className="group relative w-full h-full flex flex-col items-center justify-center transition-all ease-in-out">
            {children}
            <div className={`${tooltipClasses} absolute z-10 transition-all whitespace-normal break-words duration-200 scale-0 pointer-events-none group-hover:scale-100 invisible group-hover:visible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}>
                {title}
            </div>
        </div>
    )
}
