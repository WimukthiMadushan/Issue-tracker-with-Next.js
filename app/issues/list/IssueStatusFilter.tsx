'use client';
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'


const statusus:{label:string, value?: Status}[] = [
    { label: 'All', },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
    
]
const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root onValueChange={(selectedValue) =>{
      const query = selectedValue ? `?status=${selectedValue}` : '';
      router.push(query);
    }}>
        <Select.Trigger placeholder='Filter By Satatus..'/>
        <Select.Content>
              {statusus.map((status) => (
                  <Select.Item key={status.label} value={status.value || ' ' }>
                      {status.label}
                  </Select.Item>
              ))}     
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter