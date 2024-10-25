import { useAppDispatch } from '@/hooks';
import { setShowDialog } from '@/redux/slices/appSlice';
import React, { ComponentProps, useEffect, useRef } from 'react'
import DialogHeader from './DialogHeader';

type DialogProps = ComponentProps<"dialog">

export default function Dialog({ children, title, open = false, onClose }: DialogProps) {

    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (ref.current && !ref.current.contains(target)) {
            dispatch(setShowDialog(false))
        }

        return ref.current;
    }

    useEffect(() => {

        window.addEventListener("click", handleClickOutside, true)

        return () => {
            window.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <React.Fragment>
            {open ? <div className="fixed inset-0 z-100 bg-black bg-opacity-60 size-full" /> : ""}
            <dialog open={open} onClose={onClose} className="bg-black text-slate-200 fixed inset-0 z-100 backdrop:bg-black">

                <DialogHeader handleOnClose={onClose} title={title} />

                <div ref={ref} className="size-full m-auto px-2">
                    {children}
                </div>
            </dialog>
        </React.Fragment>
    )
}