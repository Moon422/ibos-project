import React, { ReactNode, useContext, useState } from 'react'

import ibosLogo from '../assets/images/ibos-logo-210.webp'
import mugshot from '../assets/images/mugshot.png'
import { CurrentProfileContext, TasksContext, TeamInvitationContext, TeamsContext } from '../contextproviders'
import { Link, NavLink } from 'react-router-dom'
import { Welcome } from './welcome'
import { InvitationStatus, TaskPriority, TaskStatus } from '../model'
import moment from 'moment'

const DashboardDetails: React.FC = () => {
    const currentProfileContext = useContext(CurrentProfileContext)
    const teamsContext = useContext(TeamsContext)
    const invitationsContext = useContext(TeamInvitationContext)
    const taskContext = useContext(TasksContext)

    return (
        <>
            <div className="grid grid-cols-3 gap-4 me-4">
                <div className="bg-red-500 rounded px-4 pb-4">
                    <h4 className='text-center text-white'>Teams</h4>
                    <div className="flex">
                        <p className='w-1/2'># of Teams Joined</p>
                        <p className="w-1/2">
                            {
                                teamsContext!.teams.filter(team => team.members.includes(currentProfileContext!.profile!.username)).length
                            }
                        </p>
                    </div>
                    <div className="flex">
                        <p className='w-1/2'># of Pending Invitations</p>
                        <p className="w-1/2">
                            {
                                invitationsContext!.invitations.filter(invitation => invitation.memberId === currentProfileContext!.profile!.username && invitation.invitationStatus === InvitationStatus.PENDING).length
                            }
                        </p>
                    </div>
                </div>
                <div className="bg-green-500 rounded px-4 pb-4">
                    <h4 className='text-center text-white'>Tasks by priority</h4>
                    <div className='border'>
                        <div className="flex py-1 px-2 text-white bg-stone-500">
                            <p className='w-1/4'>Title</p>
                            <p className='w-1/4'>High</p>
                            <p className='w-1/4'>Medium</p>
                            <p className='w-1/4'>Low</p>
                        </div>
                        {
                            teamsContext!.teams.map(
                                team => {
                                    const highPriorityTasksCount = taskContext!.tasks.filter(task => task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.HIGH).length
                                    const mediumPriorityTasksCount = taskContext!.tasks.filter(task => task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.MEDIUM).length
                                    const lowPriorityTasksCount = taskContext!.tasks.filter(task => task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.LOW).length
                                    return (
                                        <>
                                            {
                                                !(highPriorityTasksCount || mediumPriorityTasksCount || lowPriorityTasksCount)
                                                || (
                                                    <div className="flex px-2 py-1 bg-white">
                                                        <p className='w-1/4'>{team.title}</p>
                                                        <p className='w-1/4'>{highPriorityTasksCount} (High)</p>
                                                        <p className='w-1/4'>{mediumPriorityTasksCount} (Medium)</p>
                                                        <p className='w-1/4'>{lowPriorityTasksCount} (Low)</p>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className="bg-blue-500 rounded px-4 pb-4">
                    <h4 className='text-center text-white mb-2'>Tasks by due date</h4>
                    <h6 className="text-center text-white mt-0">Tasks Due in 2 days</h6>
                    <div className='border'>
                        <div className="flex py-1 px-2 text-white bg-stone-500">
                            <p className='w-1/4'>Title</p>
                            <p className='w-1/4'>High</p>
                            <p className='w-1/4'>Medium</p>
                            <p className='w-1/4'>Low</p>
                        </div>
                        {
                            teamsContext!.teams.map(
                                team => {
                                    const highPriorityTasksCount = taskContext!.tasks.filter(task => {
                                        const dueDiff = moment(task.dueDate).diff(Date())
                                        return task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.HIGH && dueDiff >= 0 && dueDiff <= 172800000
                                    }).length
                                    const mediumPriorityTasksCount = taskContext!.tasks.filter(task => {
                                        const dueDiff = moment(task.dueDate).diff(Date())
                                        return task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.MEDIUM && dueDiff >= 0 && dueDiff <= 172800000
                                    }).length
                                    const lowPriorityTasksCount = taskContext!.tasks.filter(task => {
                                        const dueDiff = moment(task.dueDate).diff(Date())
                                        return task.taskStatus !== TaskStatus.COMPLETED && task.teamId === team.id && task.priority === TaskPriority.LOW && dueDiff >= 0 && dueDiff <= 172800000
                                    }).length
                                    return (
                                        <>
                                            {
                                                !(highPriorityTasksCount || mediumPriorityTasksCount || lowPriorityTasksCount)
                                                || (
                                                    <div className="flex px-2 py-1 bg-white">
                                                        <p className='w-1/4'>{team.title}</p>
                                                        <p className='w-1/4'>{highPriorityTasksCount} (High)</p>
                                                        <p className='w-1/4'>{mediumPriorityTasksCount} (Medium)</p>
                                                        <p className='w-1/4'>{lowPriorityTasksCount} (Low)</p>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
            <p className='mt-10'>NB: Please don't use the address bar, back button, or reload button. There is some issue I am facing with react router.<br />Use the buttons in application for navigation</p>
        </>
    )
}

export const Dashboard: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const currentProfileContext = useContext(CurrentProfileContext)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    return (
        <>
            <nav className='h-20 flex justify-between items-center px-4 bg-gradient-to-r from-orange-300 to-blue-100'>
                <div className="h-12">
                    <img src={ibosLogo} alt="IBos Logo" className='h-full' />
                </div>
                {
                    currentProfileContext?.profile ? <button onClick={() => setShowDropdown((v) => !v)} className={`h-12 items-center flex gap-2 py-2 px-4 rounded shadow ${showDropdown ? 'bg-blue-100 shadow-black' : 'bg-orange-300'} relative hover:shadow-black hover:bg-blue-100 hover:text-black active:shadow-none active:text-white active:bg-gray-500`}>
                        <img src={currentProfileContext.profile.profilePicture || mugshot} alt="" className='rounded-full h-full' />
                        <p>Welcome back {currentProfileContext.profile.firstname}</p>
                        {
                            showDropdown && <div className="absolute w-full top-[calc(100%+0.5rem)] right-0 ">
                                <button className='p-3 w-full bg-orange-300 rounded' onClick={() => currentProfileContext.setProfile(undefined)}>Sign out</button>
                            </div>
                        }
                    </button> : <Link to='/auth' className='py-2 px-4 rounded shadow bg-orange-300 hover:shadow-black hover:bg-blue-100'>Join us</Link>
                }
                <div id="dropdownHover" className="w-20 h-20 hidden bg-red-500 top-[calc(100%+0.5rem)] right-2">

                </div>
            </nav>
            {currentProfileContext?.profile ? (
                <div className="flex gap-4">
                    <div className='h-[calc(100vh-5rem)] w-1/6 border-e flex flex-col justify-stretch text-white'>
                        <NavLink to='/' className={({ isActive }) => isActive ? 'p-4 bg-25306e' : 'p-4 bg-25306e bg-opacity-90 hover:bg-opacity-70'}>
                            Home
                        </NavLink>
                        <NavLink to='/tasks' className={({ isActive }) => isActive ? 'p-4 bg-25306e' : 'p-4 bg-25306e bg-opacity-90 hover:bg-opacity-70'}>
                            Tasks
                        </NavLink>
                        <NavLink to='/teams' className={({ isActive }) => isActive ? 'p-4 bg-25306e' : 'p-4 bg-25306e bg-opacity-90 hover:bg-opacity-70'}>
                            Teams
                        </NavLink>
                    </div>
                    <div className='w-5/6 py-4'>
                        {children || <DashboardDetails />}
                    </div>
                </div >
            ) : <Welcome />}
        </>
    )
}
