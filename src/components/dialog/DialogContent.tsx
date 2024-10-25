import React from 'react'
import DialogBody from './DialogBody'
import DialogHeader from './DialogHeader'

type props = {
    children: React.ReactNode,
    title?: string,
    size: "default" | "small" | "large",
    handleOnClose: () => void,
}

export default function DialogContent({ children, handleOnClose, ...props }: props) {
    return (
        <div className="relative w-full max-w-2xl max-h-full block m-auto bg-white dark:bg-black rounded-md">
            <DialogHeader handleOnClose={handleOnClose} title={props.title} />
            <DialogBody className='p-1'>
                {children}
            </DialogBody>
        </div>
    )
}