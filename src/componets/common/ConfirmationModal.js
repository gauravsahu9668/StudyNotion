import React from 'react'
import IcanButton from './IcanButton'
const ConfirmationModal = ({modalData}) => {
  return (
    <div>
         <div>
            <p>
                {modalData.text1}
            </p>
            <p>{modalData.text2}</p>
            <div>
                <IcanButton onclick={modalData?.btnHandler} text={modalData?.btn1Text}></IcanButton>
                <button onClick={modalData.btn2Handler}>
                    {modalData.btn2Text}
                </button>
            </div>
         </div>
    </div>
  )
}

export default ConfirmationModal
