import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'

interface Props{
    params: {id: string}
}

const IssueDetailsPage = async ({ params }: Props) => {
    let issue;
    try {
        typeof parseInt(params.id);
        issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) }
        })
    if (!issue) 
        return notFound(); 
    } catch (error) {
        return notFound();     
    }
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
  )
}

export default IssueDetailsPage