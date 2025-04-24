import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Skills from '@/components/Skills'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import profilepic from "../../public/images/profile/ProfileImg.jpeg";
import ProfileSection from '@/components/ProfileSection'

const AnimatedNumbers = ({value}) => {
    const ref = useRef(null);
    
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {duration: 3000})
    const isInView = useInView(ref,{once: true});

    useEffect(() => {
        if(isInView){
            motionValue.set(value);
        }
    }, [isInView, value, motionValue])
    

    useEffect(() => {
        springValue.on("change", (latest) =>{
            if(ref.current && latest.toFixed(0) <= value){
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value])
    
    return <span ref={ref}></span>
}

const about = () => {
  return (
    <>
      <Head>
        <title>Yash Sharma | About Page</title>
        <meta name='description' content='Learn more about Yash Sharma - A passionate software engineer specializing in full-stack development, problem-solving, and system design.' />
      </Head>

      <main className='flex w-full flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
          {/* <AnimatedText text="Passion Fuels Purpose!" className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8" /> */}
          <ProfileSection />
        </Layout>
      </main>
    </>
  )
}

export default about