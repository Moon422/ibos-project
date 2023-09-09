import React, { useContext, useState } from 'react'
import { CurrentProfileContext, TasksContext, TeamsContext } from '../contextproviders'
import { Link, useNavigate } from 'react-router-dom'
import { Task, TaskPriority, TaskStatus } from '../model'
import moment from 'moment'

const TaskListItem: React.FC<{ task: Task, first: boolean, last: boolean }> = ({ task, first, last }) => {
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

    console.log(moment(task.dueDate))

    return (
        <div onClick={() => setEditable((v) => !v)} className={`flex items-center shadow px-4 ${task.taskStatus === TaskStatus.NOT_STARTED ? 'bg-red-300' : task.taskStatus === TaskStatus.STARTED ? 'bg-blue-300' : 'bg-green-300'} ${first ? 'rounded-t' : ''} ${last ? 'rounded-b' : ''} hover:cursor-pointer bg-opacity-80 ${editable ? 'bg-opacity-100' : 'hover:bg-opacity-100'}`}>
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
                                    const [showFilter, setShowFilter] = useState<boolean>(false)
                                    const [startDate, setStartData] = useState<Date | null>()
                                    const [endData, setEndData] = useState<Date | null>()
                                    const [status, setStatus] = useState<number>(3)
                                    const [sortByPriorityDesc, setSortByPriorityDesc] = useState<boolean>(false)
                                    const [sortByDueDateDesc, setSortByDueDateDesc] = useState<boolean>(false)

                                    const tasksByTeam = tasks!.tasks
                                        .filter((task) => task.teamId === team.id)

                                    if (tasksByTeam.length > 0) {
                                        const filtered = tasksByTeam
                                            .filter((task) => !startDate || moment(task.dueDate).diff(startDate) >= 0)
                                            .filter((task) => !endData || moment(endData).diff(task.dueDate) >= 0)
                                            .filter((task) => status === 3 || task.taskStatus === status)
                                            .sort((a, b) => sortByDueDateDesc ? moment(b.dueDate).diff(a.dueDate) : moment(a.dueDate).diff(b.dueDate))
                                            .sort((a, b) => sortByPriorityDesc ? b.priority - a.priority : a.priority - b.priority)

                                        return (
                                            <div className='shadow rounded mb-4 me-4 hover:shadow-black'>
                                                <div className='flex items-center px-4'>
                                                    <h4 className='w-10/12'>{team.title}</h4>
                                                    <p className='w-1/12'>Member Count: {team.members.length}</p>
                                                    <button className='w-1/12 p-1' onClick={() => setShowFilter((v) => !v)}>Filters</button>
                                                </div>
                                                <div className={`w-96 ms-auto p-4 ${showFilter ? '' : 'hidden'}`}>
                                                    <div className='flex gap-2 mb-1'>
                                                        <label htmlFor="start" className='w-2/6 p-2'>Starting Date</label>
                                                        <input className='w-4/6 p-2 rounded' type="date" name="start" id="start" onChange={e => {
                                                            console.log(moment(e.target.value))
                                                            setStartData(() => e.target.value.length ? new Date(e.target.value) : null)
                                                        }} />
                                                    </div>
                                                    <div className="flex gap-2 mb-1">
                                                        <label className='w-2/6 p-2' htmlFor="end">Ending Date</label>
                                                        <input className='w-4/6 p-2 rounded' type="date" name="end" id="end" onChange={e => {
                                                            setEndData(() => e.target.value.length ? new Date(e.target.value) : null)
                                                        }} />
                                                    </div>
                                                    <div className="flex gap-2 mb-1">
                                                        <label className='w-2/6 p-2' htmlFor="status">Task Status</label>
                                                        <select className='w-4/6 p-2 rounded' name="status" id="status" value={status} onChange={e => setStatus(() => parseInt(e.target.value))} >
                                                            <option value={0}>Not Started</option>
                                                            <option value={1}>Started</option>
                                                            <option value={2}>Completed</option>
                                                            <option value={3}>All</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='rounded bg-neutral-600'>
                                                    <div className='flex items-center px-4 text-white'>
                                                        <h6 className='w-6/12'>Task Title</h6>
                                                        <p onClick={e => {
                                                            e.preventDefault()
                                                            setSortByDueDateDesc((v) => !v)
                                                        }} className='w-4/12'>Due Date {sortByDueDateDesc ? '(Desc)' : '(Asc)'}</p>
                                                        <p onClick={e => {
                                                            e.preventDefault()
                                                            setSortByPriorityDesc((v) => !v)
                                                        }} className='w-1/12'>Priority {sortByPriorityDesc ? '(High)' : '(Low)'}</p>
                                                        <p className='w-1/12'>Task Status</p>
                                                    </div>
                                                    <div className="p-1">
                                                        {
                                                            filtered.map((task, taskIdx) => (
                                                                <TaskListItem task={task} key={teamIdx * 100 + taskIdx} first={taskIdx === 0} last={taskIdx === (filtered.length - 1)} />
                                                            ))
                                                        }
                                                    </div>
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
