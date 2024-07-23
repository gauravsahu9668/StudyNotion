import React from 'react'

const IcanButton = ({text,onclick,children,disabled,outline=false,customClasses,type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type}>
        {
            childer? (
                <>
                  <span>
                    {text}
                  </span>
                  {children}
                </>

            ):(
                text
            )
        }
    </button>
  )
}

export default IcanButton
