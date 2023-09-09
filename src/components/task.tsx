import React, { useContext } from 'react'
import { CurrentProfileContext, TasksContext, TeamsContext } from '../contextproviders'
import { Link, useNavigate } from 'react-router-dom'
import { Task } from '../model'

export const TaskListView: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)
    const tasks = useContext(TasksContext)

    return (
        <>
            <div className="flex justify-between items-center pe-4 mb-4">
                <h3>Tasks</h3>
                <Link to='/tasks/create' className='p-2 bg-blue-500 text-white rounded hover:shadow'>Create Task</Link>
            </div>
            {
                teams!.teams
                    .filter(team => team.members.includes(currentProfile!.profile!.username))
                    .map((team, teamIdx) => (
                        <>
                            <div className='flex items-center justify-between shadow rounded mb-4 me-4 px-4 border border-transparent hover:border-inherit'>
                                <h4>{team.title}</h4>
                                <p>Member Count: {team.members.length}</p>
                            </div>
                            {
                                tasks!.tasks
                                    .filter((task) => task.teamId === team.id)
                                    .map((task, taskIdx) => (
                                        <div key={teamIdx * 100 + taskIdx} className='flex items-center justify-between shadow rounded mb-4 me-4 px-4 border border-transparent hover:border-inherit'>
                                            <h6>{task.title}</h6>
                                            <p>{task.dueDate.toString()}</p>
                                            <p>{task.priority}</p>
                                        </div>
                                    ))
                            }
                        </>
                    ))
            }
        </>
    )
}

export const TaskCreate: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)
    const tasks = useContext(TasksContext)
    const navigate = useNavigate()

    const onCreateTaskFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)

        const title = formdata.get('title')!.toString()
        const description = formdata.get('description')!.toString()
        const dueDate = new Date(formdata.get('duedate')!.toString())
        const priority = parseInt(formdata.get('priority')!.toString())
        const teamId = parseInt(formdata.get('team')!.toString())

        const task: Task = {
            id: tasks!.tasks.length, title, description, dueDate, priority, teamId
        }

        tasks!.setTasks([task, ...tasks!.tasks])

        e.currentTarget.reset()

        navigate('/tasks')
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
