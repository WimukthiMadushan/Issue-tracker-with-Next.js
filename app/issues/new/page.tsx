'use client'
import { Button,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const NewIssuePage = () => {
    return (
        <div  className="max-w-xl space-y-4">     
            <TextField.Root placeholder="Title">
	            <TextField.Slot>
		            <MagnifyingGlassIcon height="16" width="16" />
	            </TextField.Slot>
            </TextField.Root>
            <SimpleMDE placeholder="Description" />
            <Button>Submit New Issue</Button>
        </div>
  )
}

export default NewIssuePage