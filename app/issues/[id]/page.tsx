import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props{
    params: {id: string}
}
const IssueDetailsPage = async ({ params }: Props) => {
    let issue: any;
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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                    </Button>
            </Box>
        </Grid>
  )
}

export default IssueDetailsPage