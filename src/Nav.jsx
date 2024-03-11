import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
    <nav className='w-full'>
      <ul  className='flex flex-row space-x-8 bg-blue-200 w-full px-20 text-lg font-semibold'>
       
        <li className='p-2' > <Link to="/">All Projects</Link></li>

        <li className='p-2'> <Link to="/create">Create Project</Link></li>

        <li className='p-2'> <Link to="/train">Predict Model</Link></li>

      </ul>
    </nav>

    <Outlet/>
    </>
  )
}

export default Nav
