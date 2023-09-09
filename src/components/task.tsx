import React, { useContext, useState } from 'react'
import { CurrentProfileContext, TasksContext, TeamsContext } from '../contextproviders'
import { Link, useNavigate } from 'react-router-dom'
import { Task, TaskPriority, TaskStatus } from '../model'
import moment from 'moment'

const TaskListItem: React.FC<{ task: Task }> = ({ task }) => {
    const [editable, setEditable] = useState<boolean>(false)
    const [priority, setPriority] = useState<TaskPriority>(task.priority)
    const [taskStatus, setTaskStatus] = useState<TaskStatus>(task.taskStatus)
    const tasks = useContext(TasksContext)

    const onResetBtnClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault()
        setEditable(() => false)
        setPriority(() => task.priority)
        setTaskStatus(() => task.taskStatus)
    }

    const onSubmitBtnClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault()

        const taskIndex = tasks!.tasks.findIndex((_tsk) => _tsk.id === task.id)

        if (taskIndex >= 0) {
            const tsk = tasks!.tasks[taskIndex]
            tsk.priority = priority
            tsk.taskStatus = taskStatus
            tasks!.setTasks([...tasks!.tasks.slice(0, taskIndex), tsk, ...tasks!.tasks.slice(taskIndex + 1)])
        }

        setEditable(() => false)
    }

    return (
        <div onClick={() => setEditable((v) => !v)} className={`flex items-center shadow rounded px-4 ${task.taskStatus === TaskStatus.NOT_STARTED ? 'bg-red-300' : task.taskStatus === TaskStatus.STARTED ? 'bg-blue-300' : 'bg-green-300'}`}>
            <h6 className={`${editable ? 'w-5/12' : 'w-6/12'}`}>{task.title}</h6>
            <p className='w-4/12'>{moment(task.dueDate).format('hh:mm a, Do MMM (dddd)')}</p>
            <p className={`w-1/12 ${editable ? 'hidden' : ''}`}>{['Low', 'Medium', 'High'][task.priority]}</p>
            <p className={`w-1/12 ${editable ? 'hidden' : ''}`}>{['Not Started', 'Started', 'Completed'][task.taskStatus]}</p>
            <div onClick={e => e.stopPropagation()} className={`w-3/12 flex ${editable ? '' : 'hidden'}`}>
                <div className='w-1/3 pe-2'>
                    <select name="priority" id="priority" className='w-full p-2 rounded' value={priority} onChange={e => setPriority(() => parseInt(e.target.value))}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                </div>
                <div className='w-1/3 pe-2'>
                    <select name="taskstatus" id="taskstatus" className='w-full p-2 rounded' value={taskStatus} onChange={e => setTaskStatus(() => parseInt(e.target.value))}>
                        <option value={0}>Not Started</option>
                        <option value={1}>Started</option>
                        <option value={2}>Completed</option>
                    </select>
                </div>
                <div className="w-1/3 flex text-white">
                    <button type='reset' className='p-1 w-1/2 bg-red-500 rounded-s' onClick={e => onResetBtnClicked(e)}>Cancel</button>
                    <button type='submit' className='p-1 w-1/2 bg-blue-500 rounded-e' onClick={e => onSubmitBtnClicked(e)}>OK</button>
                </div>
            </div>
        </div >
    )
}

export const TaskListView: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)
    const tasks = useContext(TasksContext)

    return (
        <>
            <div className="flex justify-between items-center pe-4 mb-4">
                <h3>Tasks per team</h3>
                <Link to='/tasks/create' className='p-2 bg-blue-500 text-white rounded hover:shadow'>Create Task</Link>
            </div>
            {
                teams!.teams
                    .filter(team => team.members.includes(currentProfile!.profile!.username))
                    .map((team, teamIdx) => (
                        <>
                            {
                                (() => {
                                    const tasksByTeam = tasks!.tasks
                                        .filter((task) => task.teamId === team.id)

                                    if (tasksByTeam.length > 0) {
                                        return (
                                            <div className='shadow rounded mb-4 me-4 border border-transparent hover:border-inherit'>
                                                <div className='flex items-center justify-between px-4'>
                                                    <h4>{team.title}</h4>
                                                    <p>Member Count: {team.members.length}</p>
                                                </div>
                                                <div className='rounded bg-neutral-600'>
                                                    <div className='flex items-center px-4 text-white'>
                                                        <h6 className='w-6/12'>Task Title</h6>
                                                        <p className='w-4/12'>Due Date</p>
                                                        <p className='w-1/12'>Priority</p>
                                                        <p className='w-1/12'>Task Status</p>
                                                    </div>
                                                    {
                                                        tasksByTeam.map((task, taskIdx) => (
                                                            <TaskListItem task={task} key={teamIdx * 100 + taskIdx} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return <></>
                                    }
                                })()
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
            id: tasks!.tasks.length, taskStatus: TaskStatus.NOT_STARTED, title, description, dueDate, priority, teamId
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
