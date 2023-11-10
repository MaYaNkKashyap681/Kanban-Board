import React from 'react'

const ProjectDetails = ({ name, description }: { name: string, description: string | undefined }) => {
    return (
        <div>
            <h3 className='font-bold text-5xl text-white'> {name}</h3>
            <p>{description && <span>{description}</span>}</p>
        </div>
    )
}

export default ProjectDetails