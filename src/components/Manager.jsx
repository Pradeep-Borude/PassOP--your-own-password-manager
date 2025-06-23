import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Bounce } from 'react-toastify/unstyled';

const Manager = () => {


  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const ref = useRef()
  const passwordRef = useRef()

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }
  const showpassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/svgs/crosseye.svg")) {
      ref.current.src = "/svgs/eye.svg"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "/svgs/crosseye.svg"
    }
  }
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('🦄 Text copied to clipboard!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
  }
  const savePassword = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    // console.log([...passwordArray, form])
  }
  const editpassword = (id) => {
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }
  const deletepassword = (id) => {
    let c = confirm("Do you really want delete this password ?")
    if (c) {

      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      // console.log(`deleteing password with id ${id}`)
    }
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute top-0 z-[-2] h-screen w-[100vw] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className=" mx-auto  max-w-4xl mycontainer ">
        <div className='justify-center items-center flex flex-col'>
          <div className=' text-4xl font-bold text-purple-600'>
            <span>&lt;</span>
            <span className='text-purple-400'>Pass</span>
            <span>OP/&gt;</span>
          </div>
          <p className=' text-purple-300'>Your own Password Manager</p>
        </div>
        <div className='text-white flex flex-col p-4 gap-8'>
          <input placeholder='Enter your website URL' name="site" value={form.site} onChange={handleChange} className='border border-purple-400 text-black rounded-full px-4 py-1' type="text" id='' />
          <div className='flex flex-col gap-2 relative md:flex-row'>
            <input placeholder='Username' name="username" value={form.username} onChange={handleChange} className='border w-full rounded-full border-purple-400 text-black px-4 py-1' type="text" />
            <input ref={passwordRef} placeholder='Password' name="password" value={form.password} onChange={handleChange} className='border w-full rounded-full border-purple-400 text-black px-4 py-1 md:w-1/2 ' type="password" />
            <img ref={ref} onClick={showpassword} className='absolute right-1 top-[5px] cursor-pointer' src="/svgs/eye.svg" alt="" />
          </div>
          <button onClick={savePassword} className='border border-purple-400 self-center rounded-full flex px-4 py-1 text-purple-300'>
            <img className='px-2' src="/svgs/add.svg" alt="" />
            Add Password</button>
            
        </div>
        <div className='passwords text-white flex flex-col items-center'>
          <h2 className=" text-2xl py-2 font-bold text-transparent bg-clip-text bg-[radial-gradient(circle_farthest-side,rgba(255,255,255,0.9),rgba(192,132,255,0.6),rgba(147,51,234,0.8))]">
            Your Passwords
          </h2>

          {passwordArray == 0 && <div>No passwords to show</div>}
          {passwordArray != 0 && <div className="relative w-[90vw] md:w-[1000px] max-h-[192px] overflow-y-scroll overflow-x-auto no-scrollbar  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700 text-xls uppercase text-gray-700 dark:text-gray-400">
                <tr >
                  <th className="px-6 py-3 text-center">Site</th>
                  <th className="px-6 py-3 text-center">Username</th>
                  <th className="px-6 py-3 text-center">Password</th>
                  <th className="px-6 py-3 text-center">actions</th>
                </tr>

              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-3  text-yellow-100  ">
                      <div className='flex gap-2 justify-center'>
                        <a href={item.site} target='_blank'> {item.site}</a>
                        <button onClick={() => { copyText(item.password) }} className="relative overflow-hidden rounded-full p-3 bg-gray-700 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><img className='invert' src="/svgs/copy.svg" alt="" /></button>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className='flex gap-2 justify-center'>
                        {item.username}
                        <button onClick={() => { copyText(item.password) }} className="relative overflow-hidden rounded-full p-3 bg-gray-700 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><img className='invert' src="/svgs/copy.svg" alt="" /></button>

                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className='flex gap-2 justify-center'>
                        {item.password}
                        <button onClick={() => { copyText(item.password) }} className="relative overflow-hidden rounded-full p-3 bg-gray-700 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><img className='invert' src="/svgs/copy.svg" alt="" /></button>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">

                      <div className='flex justify-center gap-1'>
                        <button onClick={() => { editpassword(item.id) }} className="relative overflow-hidden rounded-full p-3 bg-gray-700 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><img  src="/svgs/edit.svg" alt="" /></button>
                        <button onClick={() => { deletepassword(item.id) }} className="relative overflow-hidden rounded-full p-3 bg-gray-700 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><img  src="/svgs/delete.svg" alt="" /></button>

                      </div>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          }
        </div>
      </div>
    </>
  )
}

export default Manager
