import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from '@/components/Icons'
import { motion } from 'framer-motion'

const FeaturedProject = ({ type, title, summary, img, link, github, technologies }) => {
    return (
        <article className='w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]' />
            <Link href={link} target="_blank" className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full'>
                <Image src={img} alt={title} className="w-full h-auto" width={500} height={300} priority />
            </Link>
            <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
                <span className='text-primary font-medium text-xl dark:text-primaryDark xs:text-base'>{type}</span>
                <Link href={link} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm'>{title}</h2>
                </Link>
                <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>{summary}</p>
                <div className='flex flex-wrap gap-2 my-2'>
                    {technologies.map((tech, index) => (
                        <span key={index} className='bg-dark text-light px-3 py-1 rounded-full text-sm dark:bg-light dark:text-dark'>
                            {tech}
                        </span>
                    ))}
                </div>
                <div className='mt-2 flex items-center'>
                    <Link href={github} target="_blank" className='w-10'><GithubIcon /></Link>
                    <Link href={link} target="_blank" className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base'>Visit Project</Link>
                </div>
            </div>
        </article>
    )
}

const Project = ({ type, title, summary, img, link, github, technologies }) => {
    return (
        <article className='w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4'>
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />
            <Link href={link} target="_blank" className='w-full cursor-pointer overflow-hidden rounded-lg'>
                <Image src={img} alt={title} className="w-full h-auto" width={500} height={300} />
            </Link>
            <div className='w-full flex flex-col items-start justify-between mt-4'>
                <span className='text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base'>{type}</span>
                <Link href={link} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl'>{title}</h2>
                </Link>
                <p className='my-2 font-medium text-dark dark:text-light'>{summary}</p>
                <div className='flex flex-wrap gap-2 my-2'>
                    {technologies.map((tech, index) => (
                        <span key={index} className='bg-dark text-light px-3 py-1 rounded-full text-sm dark:bg-light dark:text-dark'>
                            {tech}
                        </span>
                    ))}
                </div>
                <div className='w-full mt-2 flex items-center justify-between'>
                    <Link href={link} target="_blank" className='text-lg font-semibold underline md:text-base'>Visit</Link>
                    <Link href={github} target="_blank" className='w-8 md:w-6'><GithubIcon /></Link>
                </div>
            </div>
        </article>
    )
}

const projects = () => {
    return (
        <>
            <Head>
                <title>Projects | Portfolio</title>
                <meta name="description" content="Showcase of my latest web development and software engineering projects" />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="Innovation Through Code" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
                    <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
                        <div className='col-span-12'>
                            <FeaturedProject 
                                type="Featured Project"
                                title="Online Code Execution System"
                                summary="Built an online code execution platform supporting C++, Java, Python, and JavaScript using Node.js, Express.js, and Docker. Persistent containers reduced execution overhead and improved performance by 70%. Deployed on AWS EC2 with PM2, ALB, and Auto Scaling. Includes input/output API and optimized response time by 25%."
                                img="https://picsum.photos/600/400?random=1"
                                link="/"
                                github="/"
                                technologies={["Node.js", "Express.js", "Docker", "AWS EC2", "PM2", "Auto Scaling"]}
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                type="Full Stack Application"
                                title="ChatWave: Real-Time Communication Platform"
                                summary="A real-time chat app built with MERN stack and Docker. Supports 1,500+ concurrent users with 99.9% uptime. JWT-based auth secures 2,000+ users. Fast messaging with sub-100ms latency and CI/CD pipeline for seamless updates."
                                img="https://picsum.photos/600/400?random=2"
                                link="/"
                                github="/"
                                technologies={["MERN", "Docker", "JWT", "Socket.io", "React Context"]}
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                type="E-commerce Platform"
                                title="Everyday Elegance"
                                summary="A microservices-based frontend for an e-commerce platform integrated with Strapi CMS and email notifications using Nodemailer. Built with Docker and deployed via Jenkins CI/CD."
                                img="https://picsum.photos/600/400?random=3"
                                link="/"
                                github="/"
                                technologies={["React", "Strapi", "Node.js", "Nodemailer", "Docker", "Jenkins"]}
                            />
                        </div>
                        <div className='col-span-12'>
                            <FeaturedProject 
                                type="Featured Project"
                                title="Instagram Clone: Scalable Social Media Platform"
                                summary="A photo and video sharing platform designed to scale for 1M+ users. Implemented features like login, signup, post creation, and profile editing. Achieved sub-10ms MongoDB reads and sub-50ms Express.js API response times."
                                img="https://picsum.photos/600/400?random=4"
                                link="/"
                                github="/"
                                technologies={["JavaScript", "MongoDB", "Express.js"]}
                            />
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default projects 