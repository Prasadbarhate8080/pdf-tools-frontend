import React from 'react'
import { Button } from './ui/button'

function OperationButton({ buttonText, ...props }) {
  return (
    
      <Button size="lg" className="" {...props}>
        {' '}
        {buttonText}{' '}
      </Button>
  )
}

export default OperationButton
