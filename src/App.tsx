import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from './components/authentication'
import { Profile, Task, Team } from './model'
import { CurrentProfileContext, TasksContext, TeamsContext, UsersContext } from './contextproviders'
import { Dashboard } from './components/dashboard'
import { TeamCreate, TeamDetail, TeamListView } from './components/team'
import { TaskCreate, TaskListView } from './components/task'
// import { Dashboard } from './components/dashboard'



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
                <Route index element={(
                  <Dashboard>
                    <p>Hello</p>
                  </Dashboard>
                )} />
                <Route path='/tasks' element={(
                  <Dashboard>
                    <TaskListView />
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
                <Route path='/teams/:id' element={(
                  <Dashboard>
                    <TeamDetail />
                  </Dashboard>
                )} />
                <Route path='/teams/create' element={(
                  <Dashboard>
                    <TeamCreate />
                  </Dashboard>
                )} />
                <Route path='/auth' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />
                <Route path='*' element={<p>page does not exists</p>} />
              </Routes>
            </CurrentProfileContext.Provider>
          </TasksContext.Provider>
        </TeamsContext.Provider>
      </UsersContext.Provider>
    </>
  )
}

export default App
