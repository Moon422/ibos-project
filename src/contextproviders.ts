import { createContext } from 'react'
import { Profile, Task, Team } from './model'

export const CurrentProfileContext = createContext<{ profile: Profile | undefined, setProfile: (p: Profile | undefined) => void } | null>(null)
export const UsersContext = createContext<{ profiles: Profile[], setProfiles: (profiles: Profile[]) => void } | null>(null)
export const TeamsContext = createContext<{ teams: Team[], setTeams: (teams: Team[]) => void } | null>(null)
export const TasksContext = createContext<{ tasks: Task[], setTasks: (teams: Task[]) => void } | null>(null)
