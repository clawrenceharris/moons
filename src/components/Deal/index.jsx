import React from 'react'

function Deal({ color, titleA, titleB }) {
    return (
        <div className='deal-container'>


            <div style={{ backgroundColor: color }} className='deal-item'>
                <h5 style={{ fontWeight: 'normal' }}>{titleA}</h5>
                <h3>
                    {titleB}
                </h3>


            </div>
            <a>Shop Now!</a>
        </div>
    )
}

export default Deal