import { VariantProps, cva } from 'class-variance-authority';
import React from 'react'
import { twMerge } from 'tailwind-merge';

const alertStyle = cva(
    ["block w-full", "my-4", "px-4 py-3", "rounded-lg"],
    {
        variants: {
            variant: {
                default: ["bg-white dark:bg-input dark:text-white"],
                success: ["bg-green-600", 'hover:bg-green-600', 'text-white'],
                danger: ["bg-red-600", 'hover:bg-red-600', 'text-white'],
                info: ["bg-blue-600", 'hover:bg-blue-600', 'text-white'],
                warning: ["bg-yellow-600", 'hover:bg-yellow-600'],
            },
        },
        defaultVariants: {
            variant: "danger",
        },
    }
);

type AlertProps = VariantProps<typeof alertStyle> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string,
    message: string | [],
}


export default function Alert({ variant, title, className, message }: AlertProps) {

    return (
        <div
            className={twMerge(alertStyle({ variant }), className)}>
            {title ? <h2>{title}</h2> : ''}
            {Array.isArray(message) ? message.map((x, i) => <div key={i} className="block">{x}</div>) : message}
        </div>
    )
}
