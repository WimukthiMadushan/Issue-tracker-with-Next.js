import { PrismaClient } from '@prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

async function getIssueDetails(id: string) {
  const issueId = Number(id);
  if (isNaN(issueId)) return null;

  return prisma.issue.findUnique({
    where: { id: issueId },
  });
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await getIssueDetails(params.id);

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session?.user && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue}/>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: issue ? issue.title : 'Issue not found',
    description: issue ? 'Details of Issue' + issue?.id : 'Issue not found',
  };
}

export default IssueDetailsPage;
