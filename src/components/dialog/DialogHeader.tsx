import React from 'react'
import { MdClose } from 'react-icons/md'
import classNames from 'classnames';

type props = {
    children?: React.ReactNode,
    title?: string,
    handleOnClose: any

}

function DialogHeader({ title, children, handleOnClose, ...props }: props) {

    const closeBtnClasses = classNames('dialog-close', {
        'absolute absolute top-2 bottom-0 right-2': !title,
        'mr-1': title,
    })

    return (
        <div className='dialog-header border-b border-white/10 flex items-center justify-between relative'>
            {title ? <div className='dialog-title block w-full text-center'>{title}</div> : ''}

            {title ? (
                <div className={closeBtnClasses} onClick={handleOnClose}>
                    <button className='cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/20'>
                        <MdClose className="w-6 h-6" />
                    </button>
                </div>
            ) : ''}
        </div>
    )
}

export default DialogHeader
