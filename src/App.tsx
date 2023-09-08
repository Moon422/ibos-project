import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from './pages/authentication'
import { Profile, Task, Team } from './model'
import { CurrentProfileContext, TasksContext, TeamsContext, UsersContext } from './contextproviders'
import { Dashboard } from './pages/dashboard'
import { TaskCreate } from './pages/task'
import { TeamCreate, TeamListView } from './pages/team'



function App() {
  const [loggedinUser, setLogggedinUser] = useState<Profile>()
  const [registeredUsers, setRegisteredUser] = useState<Profile[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("users")
    const teamData = localStorage.getItem('teams')
    const taskData = localStorage.getItem('tasks')

    if (userData) {
      const users = JSON.parse(userData)
      setRegisteredUser(() => users)
    } else {
      localStorage.setItem("users", JSON.stringify([]))
    }

    if (teamData) {
      const teams = JSON.parse(teamData)
      setTeams(() => teams)
    } else {
      localStorage.setItem('teams', JSON.stringify([]))
    }

    if (taskData) {
      const tasks = JSON.parse(taskData)
      setTasks(() => tasks)
    } else {
      localStorage.setItem('tasks', JSON.stringify([]))
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
        <TeamsContext.Provider value={{
          teams, setTeams: (teams: Team[]) => setTeams(() => {
            localStorage.setItem('teams', JSON.stringify(teams))
            return teams
          })
        }}>
          <TasksContext.Provider value={{ tasks, setTasks: (tasks: Task[]) => setTasks(() => tasks) }}>
            <CurrentProfileContext.Provider value={{ profile: loggedinUser, setProfile: p => setLogggedinUser(() => p) }}>
              <Routes>
                {/* <Route path='' element={
                  <Dashboard>
                    <p>Home</p>
                  </Dashboard>
                } />
                <Route path='tasks'>
                  <Route path='' element={(
                    <Dashboard>
                      <p>Task</p>
                    </Dashboard>
                  )} />
                  <Route path='create' element={(
                    <Dashboard>
                      <TaskCreate />
                    </Dashboard>
                  )} />
                </Route>
                <Route path='teams'>
                  <Route path='' element={(
                    <Dashboard>
                      <TeamListView />
                    </Dashboard>
                  )} />
                  <Route path='create' element={(
                    <Dashboard>
                      <TeamCreate />
                    </Dashboard>
                  )} />
                </Route>
                <Route path='auth'>
                  <Route path='' element={<Login />} />
                  <Route path='register' element={<Register />} />
                </Route> */}
                <Route path='/' element={(
                  <Dashboard>
                    <p>Home</p>
                  </Dashboard>
                )} />
                <Route path='/tasks' element={(
                  <Dashboard>
                    <p>Task</p>
                  </Dashboard>
                )} />
                <Route path='/tasks/create' element={(
                  <Dashboard>
                    <TaskCreate />
                  </Dashboard>
                )} />
                <Route path='/teams' element={(
                  <Dashboard>
                    <TeamListView />
                  </Dashboard>
                )} />
                <Route path='/teams/create' element={(
                  <Dashboard>
                    <TeamCreate />
                  </Dashboard>
                )} />
                <Route path='/auth' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />
              </Routes>
            </CurrentProfileContext.Provider>
          </TasksContext.Provider>
        </TeamsContext.Provider>
      </UsersContext.Provider>
    </>
  )
}

export default App
