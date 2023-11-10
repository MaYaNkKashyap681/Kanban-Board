'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dotenv from 'dotenv'
import { useAuth } from '@/hooks/useAuth'

dotenv.config();


const ProjectCard = ({ project }: { project: Project }) => {

    const router = useRouter();
    const { user: userSession, setUser: setUserSession } = useAuth();

    const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            // console.log("Clicked")
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/${project._id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${userSession?.token}`
                    }
                })

            if (res.status === 200) {
                console.log('Project Deleted Successfully');
                router.refresh();   
            }
        }
        catch (err) {

        }

    }
    return (

        <div className='min-h-[8rem] w-full bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 p-4'>
            <div className='w-full flex justify-end z-[30]'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className='hover:bg-gray-100'>
                            <div className=' flex gap-2 items-center cursor-pointer' onClick={handleDelete}>
                                <Trash2 className='text-red-300 w-[14px]' />
                                <p>Delete</p>
                            </div>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <Link href={`board/${project._id}`}>
                    <span className='font-bold'>{project.name}</span>
                </Link>
                <p className='text-xs mt-1 text-gray-300'>{project.description}</p>
            </div>
        </div>

    )
}

export default ProjectCard