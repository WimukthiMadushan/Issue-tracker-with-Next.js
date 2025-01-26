import React from 'react'
import {Button, Table} from "@radix-ui/themes"
import Link from 'next/link'
import { prisma } from '@/prisma/client'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <div className='container mx-auto p-5 w-[80%]'>
      <div className='mb-5'>
      <Button>
        <Link href={'/issues/new'}>Add New Issue</Link>
        </Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className='block md:hidden'>
                  {issue.status}
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage