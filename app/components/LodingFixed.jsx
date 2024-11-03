import React from 'react'

const LodingFixed = () => {
    return (
        <div 
        className='position-fixed'
        style={{
            top:"50%",
            left:"50%",
            zIndex:"5"
        }}
        >
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LodingFixed
