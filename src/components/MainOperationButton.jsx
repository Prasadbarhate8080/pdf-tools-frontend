import React from 'react'
import { Button } from './ui/button'

function MainOperationButton({buttonText,...props}) {
  return (
    <Button className="absolute bottom-16 lg:hidden z-30 right-10" size="xl" {...props}>
      {' '}
      {buttonText}{' '}
    </Button>
  )
}

export default MainOperationButton
