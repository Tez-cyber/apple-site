import React, { useEffect, useRef, useState } from 'react'
import { highlightsSlides } from '../constants'

const VideoCarousel = () => {
    //======== Refs
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    // ============ useStates
    const [video, setSetVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    // ============ useEffects
    useEffect(() => {
      if(loadedData.length > 3) {
        if(!isPlaying) {
            videoRef.current[videoId].pause()
        } else {
            startPlay && videoRef.current[videoId].play()
        }
      }
    }, [startPlay, videoId, isPlaying, loadedData])
    
    useEffect(() => {
        const currentProgress = 0
        let span = videoSpanRef.current;

        if(span[videoId]) {
            // animate progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {

                },

                onComplete: () => {

                },
            })
        }
    }, [videoId, startPlay])
  return (
    <>
        <div className="flex items-center">
            {
                highlightsSlides.map((list, i) => (
                    <div key={i} id='slider' className='pr-10 sm:pr-20'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full text-center rounded-3xl overflow-hidden bg-black'>
                                <video id='video' 
                                    playsInline={true} 
                                    muted
                                    preload='auto'
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onPlay= {() => {
                                        setVideo((prevVideo) => ({...prevVideo, isPlaying: true}))
                                    }}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {
                                    list.textLists.map(text => (
                                        <p className="text-xl font-medium md:text-2xl" key={text}>
                                            {text}
                                        </p>
                                    ))
                                }
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