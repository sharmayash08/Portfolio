import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {TwitterIcon, DribbbleIcon, GithubIcon, LinkedInIcon, PinterestIcon, SunIcon, MoonIcon } from './Icons'
import Logo from './Logo'
import {motion} from 'framer-motion';
import useThemeSwitcher from './hooks/useThemeSwitcher'

const CustomLinks = ({href, title, className=""}) => {

  const router = useRouter();
  return <Link href={href} className={`${className} relative group`}>
            {title}

            <span className={`h-[1px] inline-block bg-dark absolute left-0  -bottom-0.5 
            
            group-hover:w-full transition-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'}
            dark:bg-light
            ` 
            
            
            }>&nbsp;</span>
  </Link>
}

const CustomMobileLinks = ({href, title, className="", toggle}) => {

  const handleClick = () =>{
    toggle();
    router.push(href)
  }

  const router = useRouter();
  return (
          <button href={href} className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
            {title}

            <span className={`h-[1px] inline-block bg-light absolute left-0  -bottom-0.5 
            
            group-hover:w-full transition-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'}
            dark:bg-dark
            ` 
            
            
            }>&nbsp;</span>
          </button>
  );
}

const Navbar = () => {


  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = () =>{
    setIsOpen(!isOpen)
  }


  return (
    <header 
    className='w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8'
    >


      <button className='flex-col justify-center items-center hidden lg:flex' onClick={handleClick}>
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
      </button>

      <div className='w-full flex justify-between items-center lg:hidden'>
      <nav>
            <CustomLinks href="/" title="Home" className='mr-4'  />
            <CustomLinks href="/about" title="About" className='mx-4' />
            <CustomLinks href="/projects" title="Projects" className='mx-4' />
            <CustomLinks href="/certificates" title="Certificates" className='ml-4' />
        </nav>
        
        <nav className='flex items-center justify-center flex-wrap'>
            
            <motion.a href="https://github.com/sharmayash08" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3"><GithubIcon /></motion.a>
            <motion.a href="https://www.linkedin.com/in/yashsharma0801" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3"><LinkedInIcon /></motion.a>
            

            <button onClick={() => setMode(mode==="light" ? "dark" : "light")} className="ml-3 flex items-center justify-center rounded-full p-1">
              {
                mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
              }
            </button>
        </nav>
      </div>

      {
        isOpen ?
<motion.div
initial={{scale:0,opacity:0,x:"-50%",y:"-50%"}}
animate={{scale:1,opacity:1}}
className='min-w-[70vw] flex flex-col z-30 justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32'>
      <nav className='flex items-center flex-col justify-center'>
            <CustomMobileLinks href="/" title="Home" className='' toggle={handleClick}  />
            <CustomMobileLinks href="/about" title="About" className='' toggle={handleClick} />
            <CustomMobileLinks href="/projects" title="Projects" className='' toggle={handleClick} />
            <CustomMobileLinks href="/certificates" title="Certificates" className='' toggle={handleClick} />
        </nav>
        
        <nav className='flex items-center justify-center flex-wrap mt-2'>
            <motion.a href="https://twitter.com/yash280876" target={"_blank"} whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mr-3 sm:mx-1"><TwitterIcon /></motion.a>
            <motion.a href="https://github.com/sharmayash08" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3 sm:mx-1 bg-light rounded-full dark:bg-dark"><GithubIcon /></motion.a>
            <motion.a href="https://www.linkedin.com/in/yashsharma0801" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3 sm:mx-1"><LinkedInIcon /></motion.a>
            <motion.a href="https://in.pinterest.com/yash280876/" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3 sm:mx-1"><PinterestIcon /></motion.a>
            <motion.a href="https://dribbble.com/yash080105" target={"_blank"}whileHover = {{y:-5}} whileTap={{scale:0.9}} className="w-6 mx-3 sm:mx-1"><DribbbleIcon /></motion.a>

            <button onClick={() => setMode(mode==="light" ? "dark" : "light")} className="ml-3 flex items-center justify-center rounded-full p-1">
              {
                mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
              }
            </button>
        </nav>
      </motion.div>
        : null
      }

        <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo />
        </div>
    </header>
  )
}

export default Navbar