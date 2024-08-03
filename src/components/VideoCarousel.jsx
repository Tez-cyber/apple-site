import React from 'react'
import { highlightsSlides } from '../constants'

const VideoCarousel = () => {
  return (
    <>
        <div className="flex items-center">
            {
                highlightsSlides.map((list, i) => (
                    <div key={i} id='slider' className='pr-10 sm:pr-20'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full text-center rounded-3xl overflow-hidden bg-black'>
                                <video id='video' autoPlay playsInline={true} muted preload='auto' >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default VideoCarousel