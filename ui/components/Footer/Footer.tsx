import { Button } from '@mui/material'
import React from 'react'
import { BiArrowToRight } from 'react-icons/bi'
import { PiXLogoBold } from 'react-icons/pi'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className="w-[calc(100%-0.5rem)] mx-auto h-fit backdrop-blur-md bg-base-white/80 dark:bg-base-black/80 text-base-black dark:text-base-white p-4 rounded-md flex flex-col flex-wrap gap-3 sm:flex-row items-start justify-start sm:gap-10">
      <section className='size-fit'>
        <h4 className='text-xl sm:text-2xl font-bold border-b-2 border-b-base-black/50 dark:border-b-base-white/50'>Quick Links</h4>

        <ul>
          <li><Button startIcon={<BiArrowToRight/>}  className='!bg-transparent !text-current !flex !items-center'>Home</Button></li>
        </ul>
      </section>
      <section className='size-fit'>
      <h4 className='text-xl sm:text-2xl font-bold border-b-2 border-b-base-black/50 dark:border-b-base-white/50'>Quick Links</h4>
      <ul>
      <li><Button startIcon={<PiXLogoBold/>}  className='!bg-transparent !text-current !flex !items-center'> <span>X:&nbsp;<strong className='text-neutral-800 dark:text-neutral-200'>Peter Paul</strong></span></Button></li>
      </ul>


      </section>

<p className='w-full h-fit pt-4 text-base-black/30 dark:text-base-white/30 text-center font-mono text-sm min-[498px]:text-base sm:text-xl border-t-2 border-t-base-black/20 dark:border-t-base-white/20'>&copy;copyright CodeWithAsterixh 2024</p>

    </footer>
  )
}

export default Footer