import { fetchSingleProject } from "@/lib/fetchSingleProject"
import { Project } from "@/types/types";
import ProjectDetails from "./components/ProjectDetails";
import Boards from "./components/Boards";


const BoardPage = async ({ params }: { params: { projectId: string } }) => {

    const data = await fetchSingleProject(params.projectId);
    const projectData: Project = data.data;
    return (
        <div className="pt-[4rem] px-12 text-white">
            <div className="">
                <div className="text-white">
                    <ProjectDetails name={projectData.name} description={projectData.description} />
                </div>
            </div>

            <div>
                <Boards kanbanBoard={projectData.kanbanBoard} projectId = {projectData._id}/>
            </div>
        </div>
    )
}

export default BoardPage