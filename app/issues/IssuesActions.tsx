import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const IssuesActions = () => {
  return (
     <div className='mb-5'>
          <Button >
            <Link className='text-white' href={'/issues/new'}>Add New Issue</Link>
          </Button>
      </div>
  )
}

export default IssuesActions