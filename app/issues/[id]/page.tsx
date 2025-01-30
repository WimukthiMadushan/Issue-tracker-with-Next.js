import { prisma } from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props{
    params: {id: string}
}
const IssueDetailsPage = async ({ params }: Props) => {
    const { id } = params;
    const issueId = Number(id);
    if (isNaN(issueId)) return notFound();
    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });
    if (!issue) {
        return notFound();
    }
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
  )
}

export default IssueDetailsPage