import React, { useContext, useEffect, useState } from 'react'
import { CurrentProfileContext, TeamsContext, UsersContext } from '../contextproviders'
import { Team } from '../model'
import { Link, useNavigate, useParams } from 'react-router-dom'

import mugshot from '../assets/images/mugshot.png'

export const TeamListView: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)

    return (
        <>
            <div className="flex justify-end me-4 mb-4">
                <Link to='/teams/create' className='p-2 bg-blue-300 rounded hover:shadow'>Create Team</Link>
            </div>
            {
                teams!.teams
                    .filter(team => team.members.includes(currentProfile!.profile!.username))
                    .map((team, idx) => (
                        <Link to={`/teams/${team.id}`} key={idx}>
                            <div className='flex items-center justify-between shadow rounded mb-4 me-4 px-4 border border-transparent hover:border-inherit'>
                                <h4>{team.title}</h4>
                                <p>Member Count: {team.members.length}</p>
                            </div>
                        </Link>
                    ))
            }
        </>
    )
}

export const TeamDetail: React.FC = () => {
    const { id } = useParams()
    const teams = useContext(TeamsContext)
    const users = useContext(UsersContext)
    const [team, setTeam] = useState<Team>()

    useEffect(() => {
        const idNum = parseInt(id!)

        const t = teams!.teams.find((team) => team.id === idNum)
        if (t) {
            setTeam(() => t)
        }
    }, [])

    return (
        <>
            <div>
                <div className="flex justify-end pe-4 mb-4">
                    <Link to={`/teams/${id}/add`} className='p-2 bg-blue-300 rounded hover:shadow'>Add Member</Link>
                </div>
                {users?.profiles.filter((user) => team?.members.includes(user.username)).map((user, idx) => (
                    <div key={idx} className='flex items-center justify-between shadow rounded mb-4 me-4 px-4 border border-transparent hover:border-inherit'>
                        <div className="flex gap-4 items-center">
                            <div className='h-10'>
                                <img src={user.profilePicture ?? mugshot} className='rounded-full h-full' />
                            </div>
                            <h4>{user.firstname} {user.lastname}</h4>
                        </div>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export const TeamAddMember: React.FC = () => {
    const { id } = useParams()
    const teams = useContext(TeamsContext)
    const users = useContext(UsersContext)
    const [team, setTeam] = useState<Team>()

    useEffect(() => {
        const idNum = parseInt(id!)

        const t = teams!.teams.find((_team) => _team.id === idNum)
        if (t) {
            console.log(t)
            setTeam(() => t)
        }
    }, [])

    const onAddTeamMemberFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        // const formData = new FormData(e.currentTarget)
        // const username = formData.get('member')!.toString()

        // const teamIdx = teams!.teams.findIndex((_team) => _team.id === team!.id)
        // team!.members.push(username)
        // const teamRecords = [...teams!.teams.slice(0, teamIdx), team, ...teams!.teams.slice(teamIdx + 1)]
    }

    return (
        <>
            <form className='p-10 border rounded-xl shadow w-3/5 mx-auto' onSubmit={e => onAddTeamMemberFormSubmit(e)}>
                <h3 className='text-center text-4975bc'>Create new team with</h3>
                <h1 className='text-center text-292f7b'>iBos Task Management Tool</h1>
                <hr className='mb-16' />
                <div className="flex items-start mb-4">
                    <label htmlFor="member" className='w-1/6 p-2'>Member</label>
                    <select name="member" id="member" required className='bg-white drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500'>
                        {
                            users?.profiles.filter(user => !(team?.members.includes(user.username))).map((user, idx) => <option value={user.username} key={idx}>{user.firstname} {user.lastname}</option>)
                        }
                    </select>
                </div>
                <button type="submit" className='w-full bg-blue-500 p-2 rounded text-white mb-4'>Add to Team</button>
            </form>

        </>
    )
}

export const TeamCreate: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)
    const navigate = useNavigate()

    const onCreateTeamFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        const name = formdata.get('name')!.toString()
        const team: Team = { id: teams!.teams.length, title: name, members: [] }
        team.members.push(currentProfile!.profile!.username)
        const newRecord = [team, ...teams!.teams]
        teams?.setTeams(newRecord)
        navigate('/teams')
    }

    return (
        <>
            <form className='p-10 border rounded-xl shadow w-3/5 mx-auto' onSubmit={e => onCreateTeamFormSubmit(e)}>
                <h3 className='text-center text-4975bc'>Create new team with</h3>
                <h1 className='text-center text-292f7b'>iBos Task Management Tool</h1>
                <hr className='mb-16' />
                <div className="flex items-start mb-4">
                    <label htmlFor="name" className='w-1/6 p-2'>Name</label>
                    <input type="text" name="name" id="name" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Name' />
                </div>
                <button type="submit" className='w-full bg-blue-500 p-2 rounded text-white mb-4'>Create Team</button>
            </form>
        </>
    )
}
