import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";

import * as THREE from 'three';
import { models, sizes } from "../constants";
import CanvasModel from "./CanvasModel";

const Model = () => {
    //========= useState
    const [size, setsize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg
    })
    const [smallRotation, setSmallRotation] = useState(0)
    const [largeRotation, setLargeRotation] = useState(0)

    //======== camera control for model view
    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()


    //=========== models
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    //=========== useGSAP
    useGSAP(() => {
        gsap.to('#heading', {
            y: 0,
            opacity: 1
        })
    }, [])
  return (
    <section className='common-padding'>
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look.
            </h1>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] overflow-hidden relative md:h-[90vh]">
                    <ModelView
                        index = {1}
                        groupRef = {small}
                        gsapType = "view1"
                        controlRef = {cameraControlSmall}
                        setRotationState = {setSmallRotation}
                        item = {model}
                        size = {size}
                    />
                    <ModelView
                        index = {2}
                        groupRef = {large}
                        gsapType = "view2"
                        controlRef = {cameraControlLarge}
                        setRotationState = {setLargeRotation}
                        item = {model}
                        size = {size}
                    />
                    {/* <Canvas
                        className='w-full h-full'
                        style = {{
                            position: 'fixed',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            overflow: 'hidden'
                        }}
                        eventSource={document.getElementById('root')}
                    >
                        <View.Port />
                    </Canvas> */}
                    <CanvasModel />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model