"use client"
import { fetchSingleProject } from "@/lib/fetchSingleProject"
import { Project } from "@/types/types";
import ProjectDetails from "./components/ProjectDetails";
import Boards from "./components/Boards";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const BoardPage = ({ params }: { params: { projectId: string } }) => {

    const [projectData, setProjectData] = useState<Project | null>(null)
    const { user: userSession, setUser: setUserSession } = useAuth();

    useEffect(() => {
        async function exec() {
            const data = await fetchSingleProject(params.projectId, userSession?.token);
            setProjectData(data!.data);
        }
        exec();
    }, [projectData])

    return (
        <>
            {
                projectData ?
                    <div className="pt-[4rem] px-12 text-white">
                        <div className="">
                            <div className="text-white">
                                <ProjectDetails name={projectData.name} description={projectData.description} />
                            </div>
                        </div>

                        <div>
                            <Boards kanbanBoard={projectData.kanbanBoard} projectId={projectData._id} />
                        </div>
                    </div> : <>Loading Project</>
            }
        </>
    )
}

export default BoardPage