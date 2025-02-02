import { Box} from '@radix-ui/themes'
import React from 'react'
import  Skeleton  from './../../components/Skelton'

const IssueFormSkelton = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='3rem'/>
      <Skeleton height="20rem"/>
    </Box>
  )
}

export default IssueFormSkelton