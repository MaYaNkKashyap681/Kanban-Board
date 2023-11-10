"use client"
import { Item } from '@/types/types'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios';

const ItemCard = ({ carddata, projectId, colIndex, itemIndex }: { carddata: Item, projectId: string, colIndex: number, itemIndex: number }) => {

    const [opened, setOpened] = useState(false);
    const [taskName, setTaskName] = useState(carddata.name);

    const router = useRouter();
    const { user: userSession, setUser: setUserSession } = useAuth();

    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/projects/${projectId}/delete-task/${colIndex}/${itemIndex}`,
                {
                    headers: {
                        'Authorization': `Bearer ${userSession?.token}`,
                    },
                }
            );

            console.log(response.data);

            // Close the modal and potentially update the state or handle any other UI updates
            setOpened(false);
            router.refresh();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdateTask = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/projects/${projectId}/update-task/${colIndex}/${itemIndex}`,
                { name: taskName },
                {
                    headers: {
                        'Authorization': `Bearer ${userSession?.token}`,
                    },
                }
            );

            console.log(response.data);

            // Close the modal and potentially update the state or handle any other UI updates
            setOpened(false);
            router.refresh();

        } catch (error) {
            console.error('Error updating task:', error);
        }finally {
            setTaskName('');
        }
    };

    const handleMoveTask = async (toColumnIndex: number) => {
        try {
            const response = await axios.post(`http://localhost:8000/projects/${projectId}/move-task/${colIndex}/${toColumnIndex}/${itemIndex}`, null, {
                headers: {
                    'Authorization': `Bearer ${userSession?.token}`,
                },
            });

            if (response.data.success) {
                // Handle success, e.g., update local state
                console.log('Task moved successfully');
                router.refresh();
            }
        } catch (err) {
            // Handle error
            console.error('Error moving task:', err);
        }
    };

    return (
        <div>
            <div className='p-2 cursor-pointer bg-gray-100 filter backdrop-blur-lg bg-opacity-25 text-white font-medium text-md'
                onClick={() => setOpened(true)}>
                {carddata.name}
            </div>
            {
                opened &&
                <div className='h-screen w-screen absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-[#000000] bg-opacity-20 z-[30]'>
                    <div className='bg-white w-[30rem] min-h-[10rem] rounded-sm p-4'>
                        <div className='flex justify-end'>
                            <X className='text-red-500 cursor-pointer' onClick={() => setOpened(false)} />
                        </div>
                        <h4 className='font-semibold text-green-500'>Task Name</h4>
                        <input className='text-[#000000] p-1 w-full border-[2px] border-green-500' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                        <div className='flex mt-3 gap-3'>
                            <div className='p-1 text-white bg-red-400 text-sm cursor-pointer' onClick={handleDeleteTask}>
                                Delete
                            </div>
                            <div className='p-1 bg-green-500 text-white text-sm cursor-pointer' onClick={handleUpdateTask}>
                                Update
                            </div>

                        </div>
                        <div className='flex items-center gap-4 mt-3'>
                            <div className='p-1 bg-blue-500 text-white text-sm cursor-pointer' onClick={() => handleMoveTask(0)}>
                                Move to Todo
                            </div>
                            <div className='p-1 bg-yellow-500 text-white text-sm cursor-pointer' onClick={() => handleMoveTask(1)}>
                                Move to Progress
                            </div>
                            <div className='p-1 bg-indigo-500 text-white text-sm cursor-pointer' onClick={() => handleMoveTask(2)}>
                                Move to Completed
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ItemCard;
