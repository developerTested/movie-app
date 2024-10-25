import React from 'react'
import classNames from 'classnames'

type props = {
    children: React.ReactNode,
    className?: string,
}

function DialogBody({ children, ...props }: props) {
    const classes = classNames('m-auto', props.className);
    return (
        <div {...props} className={classes}>
            {children}
        </div>
    )
}

export default DialogBody
