"use client";
import dynamic from 'next/dynamic'
import IssueFormSkelton from './loading'

const IssueForm = dynamic(
  () => import('@/app/issues/_components/issueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkelton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage