import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '@/components/Modal'

const CertificateCard = ({ title, date, organization, image, description, skills, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isEven = index % 2 === 0

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} image={image} title={title} />
      <motion.div 
        className='w-full p-8 my-8 rounded-2xl flex items-center justify-between bg-light text-dark dark:bg-dark dark:text-light border-2 border-solid border-dark dark:border-light shadow-xl hover:shadow-2xl transition-shadow'
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:"spring"}}
      >
        <div className={`w-full flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-12 lg:flex-col`}>
          <div className='w-2/5 lg:w-full cursor-pointer' onClick={() => setIsModalOpen(true)}>
            <div className='relative aspect-[4/3] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md'>
              <Image 
                src={image} 
                alt={title} 
                className="object-cover" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority 
              />
            </div>
          </div>
          <div className='w-3/5 lg:w-full'>
            <h2 className='text-3xl font-bold mb-4 text-dark dark:text-light'>{title}</h2>
            <p className='text-base text-primary dark:text-primaryDark font-semibold mb-4'>{organization} • {date}</p>
            <p className='text-lg mb-6 text-dark/75 dark:text-light/75'>{description}</p>
            <div className='flex flex-wrap gap-3'>
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className='bg-dark/5 dark:bg-light/5 px-4 py-2 rounded-lg text-base font-medium hover:bg-dark/10 dark:hover:bg-light/10 transition-colors'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

const certificates = () => {
  const certificatesData = [
    {
      title: "Elite + Silver Badge in Cloud Computing",
      date: "2023",
      organization: "IIT Kharagpur, NPTEL",
      image: "/images/certificates/nptel.jpg",
      description: "Achieved Elite + Silver Badge in Cloud Computing with a score of 82%, demonstrating strong understanding of cloud technologies and infrastructure.",
      skills: ["Cloud Computing", "AWS", "Azure", "DevOps"]
    },
    {
      title: "Data Structures and Algorithms Training",
      date: "2023",
      organization: "HitbullsEye",
      image: "/images/certificates/hitbullsdsa.jpg",
      description: "Completed 6-week summer training on data structures and algorithms, covering advanced algorithmic concepts and problem-solving techniques.",
      skills: ["DSA", "Problem Solving", "Algorithms", "Time Complexity"]
    },
    {
      title: "All India NCAT (Naukri Campus)",
      date: "2023",
      organization: "Naukri.com",
      image: "/images/certificates/ncat.jpg",
      description: "Qualified in the national-level competence assessment test, demonstrating strong technical and analytical skills.",
      skills: ["Technical Skills", "Analytical Thinking", "Problem Solving"]
    },
    {
      title: "Data Structures and Algorithms using C++",
      date: "2023",
      organization: "Cipher Schools",
      image: "/images/certificates/cipherdsa.jpg",
      description: "Completed comprehensive certification in DSA using C++, showcasing strong problem-solving abilities and programming skills.",
      skills: ["C++", "DSA", "OOP", "STL", "Problem Solving"]
    }
  ]

  return (
    <>
      <Head>
        <title>Certificates | Portfolio</title>
        <meta name="description" content="View my professional certifications and achievements" />
      </Head>
      <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText text="Certificates" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
          
          <div className='flex flex-col gap-16'>
            {certificatesData.map((cert, index) => (
              <CertificateCard 
                key={index}
                index={index}
                {...cert}
              />
            ))}
          </div>
        </Layout>
      </main>
    </>
  )
}

export default certificates 