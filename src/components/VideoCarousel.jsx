import React, { useEffect, useRef, useState } from 'react'
import { highlightsSlides } from '../constants'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { pauseImg, playImg, replayImg } from '../utils'


const VideoCarousel = () => {
    //======== Refs
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    // ============ useStates
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    const [loadedData, setLoadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    //============= useGSAP
    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])
    // ============ useEffects
    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate progress of the video
            let anim = gsap.to(span[videoId], {
                // ======== update animation progress
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100) // anim.progress() is a built gsap method

                    if(progress != currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'black'
                        })
                    }
                },
                // === animation when completed
                onComplete: () => {
                    if(isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                },
            })

            if(videoId === 0) {
                anim.restart();
            }

            // animation update
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / highlightsSlides[videoId].videoDuration)
            }

            //===== 
            if(isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay])

    //============= functions
    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo(prevVideo => ({...prevVideo, isEnd: true, videoId: i + 1}))
                break;
            case 'video-last':
                setVideo(prevVideo => ({...prevVideo, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo(prevVideo => ({...prevVideo, isLastVideo: false, videoId: 0}))
                break;
            case 'play': 
                setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            case 'pause': 
                setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
        
            default:
                return video;
        }
    }

    const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e])
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
                                        className={
                                            `${
                                                list.id === 2 && 'translate-x-44'
                                            } pointer-events-none`
                                        }
                                        preload='auto'
                                        ref={(el) => (videoRef.current[i] = el)}
                                        onPlay={() => {
                                            setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                                        }}
                                        onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                        onEnded={() => {
                                            i !== 3 
                                             ? handleProcess('video-end', i)
                                             : handleProcess('video-last')
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
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={
                            isLastVideo ? () => handleProcess('video-reset') :
                                !isPlaying ? () => handleProcess('play') : () =>  handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel