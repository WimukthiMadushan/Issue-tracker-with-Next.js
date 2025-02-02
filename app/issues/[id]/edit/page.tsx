import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkelton from './loading'

const IssueForm = dynamic(
    () => import('@/app/issues/_components/issueForm'),
    {
        ssr: false,
        loading : () => <IssueFormSkelton/>
    }
)
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