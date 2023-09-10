import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome: React.FC = () => {
    return (
        <>
            <div className='py-28 bg-25306e text-white flex flex-col items-center'>
                <h3 className='text-center'>Welcome to</h3>
                <h1 className='text-center'>iBos Task Management Tool</h1>
                <Link to='/auth' className='bg-orange-300 text-black p-2 rounded mt-4 hover:shadow hover:shadow-orange-200'>Get Started</Link>
            </div>
            <p className="text-center">
                Please Sign in or Sign up for using <span className="font-bold">iBos Task Management Tool</span>
            </p>
        </>
    )
}
