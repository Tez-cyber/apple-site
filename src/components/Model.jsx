import { useGSAP } from '@gsap/react'
import React from 'react'

const Model = () => {
    useGSAP
  return (
    <section className='common-padding'>
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look.
            </h1>
        </div>
    </section>
  )
}

export default Model