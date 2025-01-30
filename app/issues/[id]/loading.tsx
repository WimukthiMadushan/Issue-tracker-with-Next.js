import { Box, Card, Flex} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetails = () => {
  return (
    <Box className='max-w-2xl mx-auto p-4 space-y-4'>
      <Skeleton/>
          <Flex className='space-x-3' my="2">
                <Skeleton width="5rem"/>
                <Skeleton width="8rem"/>
            </Flex>
            <Card className='prose' mt='4'>
                <Skeleton count={3}/>
            </Card>
        </Box>
  )
}

export default LoadingIssueDetails