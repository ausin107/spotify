import { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import RowItem from './RowItem'
export default function Row({ title, data }) {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 5,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 3,
      partialVisibilityGutter: 30,
    },
  }
  return (
    <div className='p-6 lg:w-[83.333vw] w-screen'>
      <h2 className='text-white font-bold text-2xl mb-6'>{title}</h2>
      <Carousel
        ssr={true}
        slidesToSlide={3}
        containerClass=''
        itemClass='text-white px-3'
        keyBoardControl
        removeArrowOnDeviceType={['tablet', 'mobile']}
        responsive={responsive}>
        {!!data &&
          data.map((item) => {
            return <RowItem key={item.id} className='' data={item} />
          })}
      </Carousel>
    </div>
  )
}
