import React from 'react'

const Button = ({text, onClick, color}) => {   
    return (
        <div>
            <button 
            className='btn' 
            style={{backgroundColor: color}}
            onClick={onClick}
            >
                { text }
            </button>
        </div>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Button