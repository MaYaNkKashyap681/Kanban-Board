import { Column, KanbanBoard } from '@/types/types'
import React from 'react'
import { ColumnComp } from './ColumnComp'

const Boards = ({ kanbanBoard, projectId }: { kanbanBoard: KanbanBoard, projectId: string }) => {
    return (
        <div className='mt-12'>
            <div className='grid grid-cols-3 flex-row gap-8'>
                {
                    kanbanBoard.columns.map((col: Column, index) => (
                        <ColumnComp columns={col} key={index} colIndex = {index} projectId = {projectId}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Boards