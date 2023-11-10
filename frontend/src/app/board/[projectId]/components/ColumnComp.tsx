"use client"
import { Column } from '@/types/types'
import React, { useState } from 'react'
import ItemCard from './ItemCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import dotenv from 'dotenv'

export const ColumnComp = ({ columns, projectId, colIndex }: { columns: Column, colIndex: number, projectId: string }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState('')
  const { user: userSession, setUser: setUserSession } = useAuth();
  const router = useRouter();

  const addTaskToCol = async () => {
    try {
      if (!newTask) return
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/add-item/${colIndex}`, {
        name: newTask
      },
        {
          headers: {
            'Authorization': `Bearer ${userSession?.token}`
          }
        })
        console.log(response.data)
      if (response.status === 200) {
        router.refresh();
      }
    }
    catch (err) {
      console.log('Data Not Added Successfully')
    }
    finally {
      setIsAdding(false)
      setNewTask('')
    }
  }

  return (
    <div className='h-[22rem] overflow-scroll scrollbar-hide border-[1px] border-white'>
      <div>
        <h3 className='p-4 bg-black border-[1px] border-green-500'>{columns.name}</h3>
      </div>

      <div className='flex gap-1 flex-col'>
        {
          columns.items.map((item, index) => (
            <ItemCard carddata={item} key = {index} projectId = {projectId} colIndex = {colIndex} itemIndex = {index}/>
          ))
        }
      </div>
      <div className='p-1 text-xs flex flex-col filter backdrop-blur-lg bg-opacity-25' onClick={() => setIsAdding(true)}>
        {isAdding && (
          <>
            <input
              type="text"
              className='w-full p-2  bg-black text-white text-sm'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className='p-1 bg-red-500' onClick={addTaskToCol}>Add Task</button>
          </>
        )}
        {!isAdding && <span className='p-1 bg-red-300 cursor-pointer' onClick={() => setIsAdding((prev) => !prev)}>Add Task</span>}
      </div>
    </div>
  )
}
