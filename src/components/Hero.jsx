import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from 'react'

const Hero = () => {
  //============== useState Hooks
  //===== Handle video display
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  const handleVideoSrc = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    }else {
      setVideoSrc(heroVideo)
    }
  }

  //======== useEffect Hook
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrc)

    return () => {
      window.removeEventListener('resize', handleVideoSrc)
    }
  })

  //========= Animation using useGSAP
  useGSAP(() => {
    gsap.to('.hero-title', {
      opacity: 1,
      delay: 1.5
    })

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2.125
    })
  }, [])

  return (
    <section className='w-full nav-height bg-black relative'>
        <div className="h-5/6 w-full flex-center flex-col">
            <p className='hero-title'>Iphone 15 Pro</p>
            <div className="w-9/12 md:w-10/12">
              <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
                <source src={videoSrc} type='video/mp4' />
              </video>
            </div>
        </div>
        <div id="cta" className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#highlights" className='btn'>Buy</a>
          <p className='font-medium text-xl'>From $199/month or $999</p>
        </div>
    </section>
  )
}

export default Hero
