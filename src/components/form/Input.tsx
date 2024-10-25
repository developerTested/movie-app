import { forwardRef, useEffect, useImperativeHandle, useRef, ComponentProps } from 'react';
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from 'tailwind-merge';

const inputStyles = cva(["block", "w-full", "outline-none", "border-transparent", "rounded", "disabled:cursor-not-allowed"],
    {
        variants: {
            variant: {
                default: ["bg-white dark:bg-gray-800 dark:text-slate-200"],
                secondary: ["bg-black dark:bg-white disabled:black/70 text-white dark:text-black"],
                primary: ["uppercase bg-white hover:bg-slate-200 dark:bg-white/20 text-white"],
                info: ["uppercase bg-blue-600 hover:bg-slate-200 dark:bg-white/20 text-white"],
                transparent: ["bg-transparent outline-none border-transparent"]
            },
            size: {
                default: ["rounded", "px-4 py-2", "block", "border", "dark:border-transparent"],
                sm: ["px-2", "py-1", "text-xs"],
                md: ["px-3 py-1.5 text-sm"],
                base: ["px-4 py-2 text-sm"],
                lg: ["px-5 py-3 text-base"],
                xl: ["px-6 py-4 text-lg"],
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type inputType = VariantProps<typeof inputStyles> & ComponentProps<"input"> & {
    startIcon?: React.ReactElement,
    endIcon?: React.ReactElement,
    isFocused?: boolean,
}

export default forwardRef(function TextInput({ name = "", type = 'text', variant, size, className = '', isFocused = false, ...props }: inputType, ref) {

    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="relative w-full">
            <input
                autoComplete="off"
                type={type}
                className={
                    twMerge(inputStyles({ size, variant }), className)
                }
                ref={localRef}
                {...props}
            />
        </div>
    );
});
