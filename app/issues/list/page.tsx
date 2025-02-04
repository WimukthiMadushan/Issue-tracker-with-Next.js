import { prisma } from '@/prisma/client'
import { Table } from "@radix-ui/themes"
import IssueStatusBadge from '../../components/IssueStatusBadge'
import Link from 'next/link'
import IssuesActions from './IssuesActions'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props { 
  searchParams: { status?: string; orderBy?: string };
}

const columns: { label: string, value: keyof Issue, classname?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', classname: 'hidden md:table-cell' }
];

const IssuesPage = async ({ searchParams }: Props) => {
  // Validate status
  const status = Object.values(Status).includes(searchParams.status as Status) 
    ? (searchParams.status as Status)
    : undefined;

  // Validate orderBy
  const validColumns = columns.map(c => c.value);
  const orderBy = validColumns.includes(searchParams.orderBy as keyof Issue)
    ? (searchParams.orderBy as keyof Issue)
    : undefined;

  // Fetch issues with filters and sorting
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
  });

  // Construct the URL search params
  const createQueryString = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) searchParams.append(key, value.toString());
    }
    return searchParams.toString();
  };

  return (
    <div className='container mx-auto p-5 w-[80%]'>
      <IssuesActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.label} className={column.classname}>
                <Link href={`/issues/list?${createQueryString({ ...searchParams, orderBy: column.value })}`}>
                  {column.label}
                </Link>
                {column.value === orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';
export default IssuesPage;
