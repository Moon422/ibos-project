import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from './pages/authentication'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='' element={<p>Home</p>} />
        <Route path='auth'>
          <Route path='' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
