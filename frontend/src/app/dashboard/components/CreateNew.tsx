'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import axios from 'axios';
import { withRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth'


const CreateNew = () => {

  const [projectName, setProjectName] = useState('')
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false)
  const { user: userSession, setUser: setUserSession } = useAuth();


  const handleClick = async () => {
    try {

      if(!projectName) return;
      setIsSending(true);
      const newProject = await axios.post('http://localhost:8000/projects', {
        name: projectName
      }, {
        headers: {
          'Authorization': `Bearer ${userSession?.token}`
        }
      });
      console.log('New project created:', newProject.data);
      window.location.reload();
    } catch (err) {
      console.error('Error creating project:', err);
    } finally {
      setOpen(false);
      setIsSending(false)
    }
  };
  return (
    <div className='mt-[2rem] bg-transparent'>
      <Dialog open={open} onOpenChange={setOpen} >
        <div className="border-white border-[1px] w-fit p-2">
          <DialogTrigger>
            <div className="flex items-center gap-2">
              Create Project
              <Plus />
            </div>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project Tracker</DialogTitle>
            <DialogDescription>
              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="project_name"
                    id="project_name"
                    autoComplete="project_name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <Button variant={'default'} className="mt-2 w-full" onClick={() => handleClick()}>
                    {
                      isSending ? <>
                        ...
                      </> : <>Create</>
                    }</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateNew