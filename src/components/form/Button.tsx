import React, { ComponentProps } from 'react'
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(["flex", "items-center", "justify-center", "disabled:cursor-not-allowed"],
  {
    variants: {
      variant: {
        default: ["uppercase bg-input hover:bg-midnight disabled:bg-midnight dark:bg-white/20 text-white"],
        secondary: ["bg-black dark:bg-white disabled:black/70 text-white dark:text-black"],
        primary: ["uppercase bg-blue-500 hover:bg-blue-600 text-white"],
        info: ["uppercase bg-blue-500 hover:bg-blue-600 text-white"],
        icon: ["bg-input hover:bg-midnight dark:bg-white/20 text-center py-2.5 px-4"]
      },
      size: {
        default: ["rounded", "px-4 py-2", "text-center", "block", "border-transparent"],
        sm: ["px-2", "py-1", "text-xs", "rounded"],
        md: ["px-3 py-1.5 text-sm", "rounded"],
        base: ["px-4 py-2 text-sm", "rounded"],
        lg: ["px-5 py-3 text-base", "rounded"],
        xl: ["px-6 py-4 text-lg", "rounded"],
        icon: ["p-2", "text-center", "rounded-full"]
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type buttonType = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & {
  children: React.ReactNode,
  startIcon?: React.ReactElement,
  endIcon?: React.ReactElement,
  icon?: boolean,
  rounded?: boolean,
}

const Button = ({ variant, type = "button", size, className, startIcon, endIcon, children, ...props }: buttonType) => {

  return (
    <button
      {...props}
      type={type}
      className={twMerge(buttonStyles({ variant, size }), className)}
    >
      {startIcon ? <div className="flex items-center gap-2">
        {startIcon}
        {children}
      </div> : endIcon ? <div className="flex items-center gap-2">
        {children}
        {endIcon}
      </div> : children}

    </button>
  );
};

export default Button;