'use client'
import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter()
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = async () => {
    setIsDeleting(true)
    try {
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues')
      router.refresh()
      } catch (error) {
        setIsDeleting(true);
        setError(true)
    }
  }
  return (
    <><AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description>Are You sure you want to delete this issue? This action cannot be undone</AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel><Button variant='soft' color='gray'>Cancel</Button></AlertDialog.Cancel>
          <AlertDialog.Action><Button color='red' onClick={onDelete} disabled={isDeleting}>
            Delete Issue {isDeleting && <Spinner />}
          </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
        <Button color='gray'variant='soft' mt='2' onClick={() => setError(false)}>OK</Button>
      </AlertDialog.Root>
    </>
      
  )
}

export default DeleteIssueButton