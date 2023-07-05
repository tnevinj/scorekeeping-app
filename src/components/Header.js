import React from 'react'
import Button from './Button.js'

const Header = ({ onAdd, showAdd}) => {

  return (
    <div>
      <header className='header'>
        <h1>tennisscore.co.za</h1>
        <Button color={showAdd ? 'red' : 'steelblue'} text={showAdd ? 'Close' : 'New Match'} onClick={onAdd}/>
      </header>
    </div>
  )
}

export default Header