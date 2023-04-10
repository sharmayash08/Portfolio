import React from 'react'
import {motion} from "framer-motion";


const Skill = ({name, x, y}) => {


    return(
        <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer dark:bg-light dark:text-dark lg:py-2
        lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent
        xs:text-dark xs:dark:text-light xs:font-bold
        '
        whileHover={{scale:1.05}}
        initial={{x:0, y:0}}
        whileInView={{x:x, y:y, transition: {duration:1.3}}}
        viewport={{once:true}}
        >
        {name}
        </motion.div>
    )
}


const Skills = () => {
  return (
    <>
    <h2 className='font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32'>Skills</h2>
    <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]'>
        <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:bg-light dark:text-dark
        lg:p-6 md:p-4 xs:text-xs xs:p-2
        '
        whileHover={{scale:1.05}}
        >
        Web
        </motion.div>

        <Skill name="HTML" x="10vw" y="-2vw" />
        <Skill name="CSS" x="10vw" y="-10vw" />
        <Skill name="Javascript" x="35vw" y="12vw" />
        <Skill name="ReactJS" x="0vw" y="12vw" />
        <Skill name="NextJs" x="0vw" y="-15vw" />
        <Skill name="UI/UX" x="15vw" y="-12vw" />
        <Skill name="Web Design" x="22vw" y="-5vw" />
        <Skill name="Figma" x="0vw" y="-20vw" />
        <Skill name="Firebase" x="-25vw" y="18vw" />
        <Skill name="Tailwind CSS" x="-5vw" y="8vw" />
    </div>

    
    </>
  )
}

export default Skills