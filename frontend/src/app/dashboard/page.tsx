import React from 'react'
import CreateNew from './components/CreateNew'
import Projects from './components/Projects'

const DashboardPage = () => {
    return (
        <section className='pt-[3rem] text-white'>
            <div className='container mx-auto'>
                <div>
                    <h3
                        className="pb-4 text-left font-extrabold tracking-tight text-transparent text-xl lg:text-4xl  bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60"

                    >
                        Your Projects
                    </h3>
                </div>
                <div>
                    <CreateNew />
                    <div className='h-[1px] bg-white w-full mx-auto mt-6'></div>
                </div>
                <div className='mt-[2rem]'>
                    <Projects />
                </div>
            </div>
        </section>
    )
}

export default DashboardPage