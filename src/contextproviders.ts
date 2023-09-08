import { createContext } from 'react'
import { Profile } from './model'

export const CurrentProfileContext = createContext<{ profile: Profile | undefined, setProfile: (p: Profile) => void } | null>(null)
export const UsersContext = createContext<{ profiles: Profile[], setProfiles: (profiles: Profile[]) => void } | null>(null)
