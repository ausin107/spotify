import { allSearchPageData } from './allSearchPageData'
export default function DefaultSearch() {
  return (
    <div className='px-8 pt-16 lg:pt-24'>
      <div className='lg:text-2xl text-lg font-bold text-white lg:mb-8 mb-4'>Browse all</div>
      <div className='grid lg:grid-cols-6 lg:gap-6 grid-cols-2 gap-4'>
        {allSearchPageData.map((item) => {
          return (
            <div
              key={item.id}
              className='overflow-hidden lg:w-44 lg:h-44 sm:w-full h-[5.5rem] rounded p-4 cursor-pointer relative'
              style={{ backgroundColor: `${item.bgColor}` }}>
              <div className='text-white font-bold sm:text-2xl'>{item.title}</div>
              <img
                src={item.imgUrl}
                className='absolute sm:bottom-[-5%] lg:right-[-10%] sm:right-[-8%] right-[-10%] bottom-[10%] sm:w-24 sm:h-24 w-16 h-16 rotate-[25deg]'
                alt=''
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
