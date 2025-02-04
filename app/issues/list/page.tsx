import {prisma} from "@/prisma/client";
import IssueActions from "./IssuesActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue , page:string};
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;
  const where ={status}

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where
  });

  return (
    <Flex direction='column' gap='2'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues } />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;