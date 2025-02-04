import { Button, Flex, Link } from '@radix-ui/themes'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssuesActions = () => {
  return (
    <Flex mb='5' justify='between'> 
      <IssueStatusFilter/>
          <Button >
            <Link className='text-white' href={'/issues/new'}>Add New Issue</Link>
          </Button>
      </Flex>
  )
}

export default IssuesActions