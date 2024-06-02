import React from 'react'

const Manager = () => {
  return (
  <>
    <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
    </div>
    <div className="mycontainer">
    <h1 className='font-bold text-center text-3xl'>
      <span className='text-blue-500'>&lt;</span>Pass<span className='text-blue-500'>MAN /&gt;</span>
    </h1>
    <p className='text-blue-500 text-lg text-center'>Own a Password Manager</p>
    
    <div className='text-black flex flex-col p-4 gap-6'>
      <input className='rounded-xl border w-full border-blue-500 p-4 py-1' type="text" name='' id='' />
      <div className="flex w-full justify-between gap-6">
        <input className='rounded-xl border w-full border-blue-500 p-4 py-1' type="text" name='' id='' /> 
        <input className='rounded-xl border w-full border-blue-500 p-4 py-1' type="text" name='' id='' />
      </div>
      <button>Add Password</button>
    </div>
    </div>
  </>
  )
}

export default Manager
