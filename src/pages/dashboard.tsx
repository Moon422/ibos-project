import React, { Children, ReactElement, useContext, useState } from 'react'

import ibosLogo from '../assets/images/ibos-logo-210.webp'
import mugshot from '../assets/images/mugshot.png'
import { CurrentProfileContext } from '../contextproviders'
import { NavLink } from 'react-router-dom'

export const Dashboard: React.FC<{ children: ReactElement }> = ({ children }) => {
    const currentProfileContext = useContext(CurrentProfileContext)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    return (
        <>
            <nav className='h-20 flex justify-between items-center px-4 bg-gradient-to-r from-orange-300 to-blue-100'>
                <div className="h-12">
                    <img src={ibosLogo} alt="IBos Logo" className='h-full' />
                </div>
                {
                    currentProfileContext?.profile ? <button onClick={e => setShowDropdown((v) => !v)} className={`h-12 items-center flex gap-2 py-2 px-4 rounded shadow ${showDropdown ? 'bg-blue-100 shadow-black' : 'bg-orange-300'} relative hover:shadow-black hover:bg-blue-100 hover:text-black active:shadow-none active:text-white active:bg-gray-500`}>
                        <img src={currentProfileContext.profile.profilePicture || mugshot} alt="" className='rounded-full h-full' />
                        <p>Welcome back {currentProfileContext.profile.firstname}</p>
                        {
                            showDropdown && <div className="absolute w-full top-[calc(100%+0.5rem)] right-0 ">
                                <button className='p-3 w-full bg-orange-300 rounded' onClick={() => currentProfileContext.setProfile(undefined)}>Sign out</button>
                            </div>
                        }
                    </button> : <a href='/auth' className='py-2 px-4 rounded shadow bg-orange-300 hover:shadow-black hover:bg-blue-100'>Join us</a>
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
                        <NavLink to='/tasks/create' className={({ isActive }) => isActive ? 'p-4 bg-25306e' : 'p-4 bg-25306e bg-opacity-90 hover:bg-opacity-70'}>
                            Tasks
                        </NavLink>
                        <NavLink to='/teams/create' className={({ isActive }) => isActive ? 'p-4 bg-25306e' : 'p-4 bg-25306e bg-opacity-90 hover:bg-opacity-70'}>
                            Teams
                        </NavLink>
                    </div>
                    <div className='w-5/6 py-4'>
                        {children}
                    </div>
                </div >
            ) : <p>Please Login or Signup to continue</p>}
        </>
    )
}
