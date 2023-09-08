import React, { useContext } from 'react'
import { CurrentProfileContext, TeamsContext } from '../contextproviders'
import { Team } from '../model'
import { useNavigate } from 'react-router-dom'

export const TeamListView: React.FC = () => {
    const currentProfile = useContext(CurrentProfileContext)
    const teams = useContext(TeamsContext)

    return (
        <>
            {
                teams!.teams
                    .filter(team => team.members.includes(currentProfile!.profile!.username))
                    .map((team, idx) => (
                        <a href={`/teams/${team.id}`} key={idx}>
                            <div className='flex items-center justify-between shadow rounded mb-4 me-4 px-4 border border-transparent hover:border-inherit'>
                                <h4>{team.title}</h4>
                                <p>Member Count: {team.members.length}</p>
                            </div>
                        </a>
                    ))
            }
        </>
    )
}

// export const TeamView: React.FC()

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
