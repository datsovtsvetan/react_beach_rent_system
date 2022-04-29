import React from 'react'

const Button = ({title, color, type, onClick}) => {
  return (
    <button onClick ={onClick} type={type} style={{backgroundColor: color}}>{title}</button>
  )
}

export default Button