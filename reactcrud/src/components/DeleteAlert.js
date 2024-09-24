import React from 'react'

function DeleteAlert(props) {
  

   

    return (
        <>
            <div className='d-flex justify-content-end '>
                {props.delAlert && <div class={`alert alert-${props.delAlert.type} me-5 position-absolute top-50 start-50 translate-middle`} role="alert">
                {props.delAlert.msg} <button class={`btn btn-${props.delAlert.type} text-light alert-link`}>Delete</button>
                </div>}
            </div>
        </>
    )
}

export default DeleteAlert
