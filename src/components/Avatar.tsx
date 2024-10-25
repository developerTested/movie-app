
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { getInitials } from "@/utilities/helper";
import classNames from "classnames";

const avatarStyles = cva(['flex items-center justify-center'], {
  variants: {
    size: {
      xs: "w-8 h-8",
      sm: "w-10 h-10",
      normal: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-24 h-24",
      xl: "w-32 h-32",
      "2xl": 'w-48 h-48',
      "3xl": "w-60 h-60",
      "4xl": "w-96 h-96"
    }
  },
  defaultVariants: {
    size: "normal",
  }
})

type avatarProps = VariantProps<typeof avatarStyles> & {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
  rounded?: boolean,
  className?: string,
  imageClassName?: string,
}

export default function Avatar({
  src = '/no-avatar.png',
  alt,
  size,
  rounded = true,
  className,
  imageClassName,
}: avatarProps) {

  const avatarClass = twMerge(avatarStyles({ size }), classNames('flex items-center justify-center bg-black shrink-0', { "rounded-full": rounded }), className)

  return (
    <div className={avatarClass}>
      {src ?
        <img src={src} alt={getInitials(alt ?? '')} className={twMerge(`w-full h-full object-cover border border-black ${rounded ? 'rounded-full' : ''}`, imageClassName)} /> : <div className="font-semibold">{getInitials(alt ?? '')}</div>}
    </div>
  )
}