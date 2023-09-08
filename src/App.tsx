import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from './pages/authentication'
import { Profile } from './model'
import { CurrentProfileContext, UsersContext } from './contextproviders'

import ibosLogo from './assets/images/ibos-logo-210.webp'
import mugshot from './assets/images/mugshot.png'

function App() {
  const [loggedinUser, setLogggedinUser] = useState<Profile>()
  const [registeredUsers, setRegisteredUser] = useState<Profile[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => {
    const userData = localStorage.getItem("users")

    if (userData) {
      const users = JSON.parse(userData)
      setRegisteredUser(() => users)
    } else {
      localStorage.setItem("users", JSON.stringify([]))
    }
  }, [])

  return (
    <>
      <nav className='h-20 flex justify-between items-center px-4 bg-gradient-to-r from-orange-300 to-blue-100'>
        <div className="h-12">
          <img src={ibosLogo} alt="IBos Logo" className='h-full' />
        </div>
        {
          loggedinUser ? <button onClick={e => setShowDropdown((v) => !v)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className={`h-12 items-center flex gap-2 py-2 px-4 rounded shadow ${showDropdown ? 'bg-blue-100 shadow-black' : 'bg-orange-300'} relative hover:shadow-black hover:bg-blue-100 hover:text-black active:shadow-none active:text-white active:bg-gray-500`}>
            <img src={loggedinUser.profilePicture || mugshot} alt="" className='rounded-full h-full' />
            <p>Welcome back {loggedinUser.firstname}</p>
            {
              showDropdown && <div className="absolute w-full top-[calc(100%+0.5rem)] right-0 ">
                <button className='p-3 w-full bg-orange-300 rounded' onClick={() => setLogggedinUser(() => undefined)}>Sign out</button>
              </div>
            }
          </button> : <a href='/auth' className='py-2 px-4 rounded shadow bg-orange-300 hover:shadow-black hover:bg-blue-100'>Join us</a>
        }
        <div id="dropdownHover" className="w-20 h-20 hidden bg-red-500 top-[calc(100%+0.5rem)] right-2">

        </div>
      </nav>
      <UsersContext.Provider value={{
        profiles: registeredUsers,
        setProfiles: p => setRegisteredUser(
          () => {
            localStorage.setItem('users', JSON.stringify(p))
            return p
          }
        )
      }}>
        <CurrentProfileContext.Provider value={{ profile: loggedinUser, setProfile: p => setLogggedinUser(() => p) }}>
          <Routes>
            <Route path='' element={
              loggedinUser ? <p>{`Logged in as ${loggedinUser.firstname} ${loggedinUser.lastname}`}</p> : <p>Home</p>
            } />
            <Route path='auth'>
              <Route path='' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Routes>
        </CurrentProfileContext.Provider>
      </UsersContext.Provider>
    </>
  )
}

export default App
