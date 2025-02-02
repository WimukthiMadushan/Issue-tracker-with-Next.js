'use client'
import { Button,Callout,TextField} from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor'

type IssueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({issue}: {issue?:Issue}) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSbmitting, setIsSubmitting] = useState(false);
    const { register, control, handleSubmit, formState:{errors} } = useForm<IssueFormData>(
        {resolver: zodResolver(IssueSchema)}
    );
    return (
        <div className='max-w-xl '>
            {error &&
                (<Callout.Root color='red' className='mb-4'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
        <form className="space-y-4" onSubmit={handleSubmit(async (data) => {
            try {
                setIsSubmitting(true);
                if (issue)
                    await axios.patch('/api/issues/' + issue.id, data)
                else
                   await axios.post('/api/issues/', data); 
                router.refresh();
              router.push('/issues');  
            } catch (error) {
                console.log(error);
                setIsSubmitting(false);
                setError('An Unexpected error occured.')    
            }   
         })}>     
                <TextField.Root defaultValue={issue?.title} placeholder="Title.."{...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                    name="description"
                    defaultValue={issue?.description}
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSbmitting}>{issue ? 'Update Issue' : 'Submit New Issue'}{ ' '}{ isSbmitting && <Spinner/>}</Button>
            </form>
            </div>
  )
}

export default IssueForm