"use client"
import { fetchProject } from '@/lib/fetchProject'
import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard';
import { Project } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Projects = () => {
    const [projectsList, setProjectsList] = useState<Project[]>([]);
    const { user: userSession, setUser: setUserSession } = useAuth();
    const router = useRouter();




    useEffect(() => {

       
        const fetchData = async () => {
            if (userSession?.token) {
                const data = await fetchProject(userSession.token);
                if (data) {
                    setProjectsList(data.data);
                }
            }
        };



        fetchData();
    }, [userSession]);

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {
                    projectsList.map((project: Project, item: number) => (
                        <ProjectCard project={project} key={item} />
                    ))
                }
            </div>
        </div>
    );
};

export default Projects;
