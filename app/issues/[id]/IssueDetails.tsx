import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Flex, Heading, Text , Card} from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({issue}: {issue: any}) => {
  return (
      <>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
          </Card>
      </>
  )
}

export default IssueDetails