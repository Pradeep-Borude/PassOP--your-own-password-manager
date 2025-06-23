const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center py-4 h-14 px-16">

      <div className='logo font-bold text-2xl flex text-purple-500'>
        <span>&lt;</span>
        <div className='text-purple-300'>Pass</div>
        <span>OP/&gt;</span>
      </div>
        <a href="https://github.com/Pradeep-Borude">
      <div className='inline-flex gap-1 items-center justify-center rounded-full border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] px-1 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 '>

        <h3>GitHub</h3>
        <img className="" src="/svgs/github.svg" alt="" />
      </div>
        </a>

    </nav>
  )
}

export default Navbar
