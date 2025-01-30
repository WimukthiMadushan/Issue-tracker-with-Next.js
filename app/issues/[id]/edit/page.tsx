import React from 'react'
import IssueForm from '../../_components/issueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params : {id: string}
}
const EditIssuePage = async ({ params }: Props) => {
    const id = Number(params.id);
    if (isNaN(id)) return notFound();
    const issue = await prisma.issue.findUnique({
        where: {id},
    })
    if (!issue)
        return notFound();
  return (
      <IssueForm issue={ issue} />  
  )
}

export default EditIssuePage