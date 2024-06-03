import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-14 h-12 py-8'>
      <div className="logo font-bold text-xl">
        <span className='text-blue-500'>&lt;</span>Pass<span className='text-blue-500'>MAN /&gt;</span>
      </div>
      <ul>
        <li className='flex gap-4'>
          <a className='hover:font-semibold' href="/">Home</a>
          <a className='hover:font-semibold' href="#">About</a>
          <a className='hover:font-semibold' href="#">Contact</a>
          <a className='hover:font-semibold' href="#">GitHub</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
