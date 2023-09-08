import { Profiler, createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from './pages/authentication'
import { Profile } from './model'
import { CurrentProfileContext, UsersContext } from './contextproviders'

function App() {
  const [count, setCount] = useState(0)
  const [loggedinUser, setLogggedinUser] = useState<Profile>()
  const [registeredUsers, setRegisteredUser] = useState<Profile[]>([])

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
