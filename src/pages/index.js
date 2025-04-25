import Head from 'next/head'
import Layout from '../components/Layout'
import AnimatedText from '../components/AnimatedText'
import Link from 'next/link'
import { LinkArrow } from '../components/Icons'
import HireMe from '../components/HireMe'
import lightbulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import Image from 'next/image'
import ProfileCard from '../components/ProfileCard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Yash Sharma - Software Engineer | Cloud Engineer | Backend Developer</title>
        <meta name="Yash Sharma" content="I am a versatile Software Engineer, and Backend Developer with extensive experience in creating user-centered and responsive web applications. Browse my portfolio to see my work and get in touch with me for your next project." />
      </Head>
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
       <Layout className='pt-0 md:pt-16 sm:pt-8'>
        <div className='flex items-center justify-between w-full lg:flex-col'>
          <div className='w-1/2 flex justify-center md:w-full'>
            <ProfileCard />
          </div>
          <div className='w-1/2 flex flex-col item-center self-center lg:w-full lg:text-center'>
            <AnimatedText text="Turning Vision Into Reality With Code And Design. " className='!text-6xl !text-left 
            xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:text-3xl
            ' />
            <p className='my-4 text-base font-medium md:text-sm sm:text-sm'>
              As an Aspiring Software Engineer, I am dedicated to turning ideas into innovative web applications. 
              Explore my latest projects and articles, showcasing my expertise in React.js and web development.
            </p>
            <div className='flex items-center self-start mt-2 lg:self-center'>
              <Link 
                href="/YashCV.pdf" 
                target={"_blank"} 
                className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
              >
                Resume <LinkArrow className="w-6 ml-1" />
              </Link>
              <Link 
                href="mailto:yash280876@gmail.com" 
                target={"_blank"}
                className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
       </Layout>

       <div className='absolute right-8 bottom-8 inline-block w-24 md:hidden'>
        <Image src={lightbulb} alt="Yash Sharma" className='w-full h-auto' />
       </div>
      </main>
    </>
  )
}
