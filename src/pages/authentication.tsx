const Login: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='p-10 border rounded-xl shadow w-2/5'>
                <h3 className='text-center text-4975bc'>Login to iBos</h3>
                <h1 className='text-center text-292f7b'>Task Management Tool</h1>
                <hr className='mb-16' />
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
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='p-10 border rounded-xl shadow w-2/5'>
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
                <div className="flex mb-4">
                    <label htmlFor="username" className='w-3/12 p-2'>Username</label>
                    <input type="text" name="username" id="username" required className='drop-shadow border rounded w-9/12 p-2 focus:outline-none focus:border-0 focus:border-b-2 focus:border-blue-500' placeholder='Username' />
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
