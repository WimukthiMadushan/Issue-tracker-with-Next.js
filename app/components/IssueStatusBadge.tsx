import { Badge } from '@radix-ui/themes'

enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

interface Props{
    status: Status
}
const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    DONE: { label: 'Done', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
    return (
      <Badge color={statusMap[status].color} className='text-xs'>
          {statusMap[status].label}
      </Badge>
  )
}

export default IssueStatusBadge