import React from 'react'
import { Button } from './ui/button'

function SidebarOperationButton({buttonText,...props}) {
  console.log({...props})
  return (
    <Button size="xl" className="hidden  lg:block" {...props}>
      {' '}
      {buttonText}{' '}
    </Button>
  )
}

export default SidebarOperationButton
