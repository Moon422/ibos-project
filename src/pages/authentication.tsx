import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentProfileContext, UsersContext } from '../contextproviders'

const Login: React.FC = () => {
    const [loginError, setLoginError] = useState<string | undefined>()
    const currentProfileContext = useContext(CurrentProfileContext)
    const usersContext = useContext(UsersContext)
    const navigate = useNavigate()

    const onLoginFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const username = formData.get('username')!.toString()
        const password = formData.get('password')!.toString()

        const profile = usersContext?.profiles.find((profile) => profile.username === username)

        if (profile) {
            if (password === profile.password) {
                currentProfileContext?.setProfile(profile)
                navigate('/')
            } else {
                setLoginError(() => 'Invalid Credentials')
            }
        } else {
            setLoginError(() => 'Invalid Credentials')
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='p-10 border rounded-xl shadow w-2/5' onSubmit={e => onLoginFormSubmit(e)}>
                <h3 className='text-center text-4975bc'>Login to iBos</h3>
                <h1 className='text-center text-292f7b'>Task Management Tool</h1>
                <hr className='mb-16' />
                {
                    loginError && <p className="p-2 mb-2 text-sm text-center text-red-500">
                        {loginError}
                    </p>
                }
                <div className="flex items-center mb-4">
                    <label htmlFor="username" className='w-1/6'>Username</label>
                    <input type="text" name="username" id="username" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Username' />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="password" className='w-1/6'>Password</label>
                    <input type="password" name="password" id="password" required className='drop-shadow border rounded w-5/6 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Password' />
                </div>
                <button type="submit" className='w-full bg-blue-500 p-2 rounded text-white mb-4'>Login</button>
                <hr className='mb-4' />
                <p className='text-center'>
                    Do not have an account?
                    <br />
                    <a href="/auth/register" className='text-sm bg-orange-400 bg-opacity-20 p-1 rounded hover:bg-opacity-40'>Create Account</a>
                </p>
            </form>
        </div>
    )
}

const Register: React.FC = () => {
    const [usernameWarning, setUsernameWarning] = useState<string | undefined>()
    const currentProfileContext = useContext(CurrentProfileContext)
    const usersContext = useContext(UsersContext)
    const navigate = useNavigate()

    const onRegistrationFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const registrationData = new FormData(e.currentTarget)

        const profile = {
            firstname: registrationData.get('firstname')!.toString(),
            lastname: registrationData.get('lastname')!.toString(),
            username: registrationData.get('username')!.toString(),
            password: registrationData.get('password')!.toString(),
            userbio: registrationData.get('bio')!.toString(),
        }

        if (localStorage.getItem(`account_${profile.username}`)) {
            setUsernameWarning(() => "Use a different different username")
        } else {
            setUsernameWarning(undefined)
            e.currentTarget.reset()
            const usersRecord = [profile, ...usersContext!.profiles]
            usersContext?.setProfiles(usersRecord)
            currentProfileContext?.setProfile(profile)
            navigate('/')
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='p-10 border rounded-xl shadow w-2/5' onSubmit={e => onRegistrationFormSubmit(e)}>
                <h3 className='text-center text-4975bc'>Register to iBos</h3>
                <h1 className='text-center text-292f7b'>Task Management Tool</h1>
                <hr className='mb-16' />
                <div className="flex mb-4">
                    <label className='w-3/12 p-2'>Name</label>
                    <div className="flex gap-4 w-9/12">
                        <input type="text" name="firstname" id="lastname" required className='drop-shadow border rounded w-1/2 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='First Name' />
                        <input type="text" name="lastname" id="lastname" required className='drop-shadow border rounded w-1/2 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Last Name' />
                    </div>
                </div>
                <div className="flex mb-4 relative">
                    <label htmlFor="username" className='w-3/12 p-2'>Username</label>
                    <div className='w-9/12'>
                        <input type="text" name="username" id="username" required className='drop-shadow border rounded w-full p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Username' />
                        {usernameWarning && <p className='text-xs text-right pt-2 text-red-500'>{usernameWarning}</p>}
                    </div>
                </div>
                <div className="flex mb-4">
                    <label htmlFor="password" className='w-3/12 p-2'>Password</label>
                    <input type="password" name="password" id="password" required className='drop-shadow border rounded w-9/12 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Password' />
                </div>
                <div className="flex mb-4">
                    <label htmlFor="bio" className='w-3/12 p-2'>About yourself</label>
                    <textarea name="bio" id="bio" className='drop-shadow border rounded w-9/12 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Tell us about yourself' required></textarea>
                </div>
                <button type="submit" className='w-full bg-blue-500 p-2 rounded text-white mb-4'>Sign Up</button>
                <hr className='mb-4' />
                <p className='text-center'>
                    Alread have an account?
                    <br />
                    <a href="/auth" className='text-sm bg-orange-400 bg-opacity-20 p-1 rounded hover:bg-opacity-40'>Sign in</a>
                </p>
            </form>
        </div>
    )
}

export { Login, Register }
