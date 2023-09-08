import React, { useContext } from 'react'
import { CurrentProfileContext, TeamsContext } from '../contextproviders'
import { Link } from 'react-router-dom'

export const TaskListView: React.FC = () => {
    return (
        <>
            <Link to='/tasks/create'>Create</Link>
        </>
    )
}

export const TaskCreate: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)

    const onCreateTaskFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    }

    return (
        <>
            <form className='p-10 border rounded-xl shadow w-3/5 mx-auto' onSubmit={e => onCreateTaskFormSubmit(e)}>
                <h3 className='text-center text-4975bc'>Create new task with</h3>
                <h1 className='text-center text-292f7b'>iBos Task Management Tool</h1>
                <hr className='mb-16' />
                <div className="flex items-start mb-4">
                    <label htmlFor="title" className='w-1/6 p-2'>Title</label>
                    <input type="text" name="title" id="title" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Title' />
                </div>
                <div className="flex items-start mb-4">
                    <label htmlFor="description" className='w-1/6 p-2'>Description</label>
                    <textarea name="description" id="description" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Description' />
                </div>
                <div className="flex items-start mb-4">
                    <label htmlFor="duedate" className='w-1/6 p-2'>Due Date</label>
                    <input type="datetime-local" name="duedate" id="duedate" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' />
                </div>
                <div className="flex items-start mb-4">
                    <label htmlFor="priority" className='w-1/6 p-2'>Task Priority</label>
                    <select name="priority" id="priority" required className='bg-white drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500'>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                </div>
                <div className="flex items-start mb-4">
                    <label htmlFor="team" className='w-1/6 p-2'>Team</label>
                    <select name="team" id="team" required className='bg-white drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500'>
                        {
                            teams?.teams
                                .filter((team) => team.members.includes(currentProfile!.profile!.username))
                                .map((team, idx) => <option key={idx} value={team.id}>{team.title}</option>)
                        }
                    </select>
                </div>
                <button type="submit" className='w-full bg-blue-500 p-2 rounded text-white mb-4'>Create Task</button>
            </form>
        </>
    )
}
