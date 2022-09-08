import { allSearchPageData } from './allSearchPageData'
export default function DefaultSearch() {
  return (
    <div className='px-8 sm:pt-16 lg:pt-24'>
      <div className='lg:text-2xl sm:text-lg font-bold text-white lg:mb-8 sm:mb-4'>Browse all</div>
      <div className='grid lg:grid-cols-6 lg:gap-6 sm:grid-cols-2 sm:gap-4'>
        {allSearchPageData.map((item) => {
          return (
            <div
              key={item.id}
              className='overflow-hidden lg:w-44 lg:h-44 sm:w-full sm:h-[5.5rem] rounded p-4 cursor-pointer relative'
              style={{ backgroundColor: `${item.bgColor}` }}>
              <div className='text-white font-bold text-2xl'>{item.title}</div>
              <img
                src={item.imgUrl}
                className='absolute bottom-[-5%] lg:right-[-10%] sm:right-[-8%] w-24 h-24 rotate-[25deg]'
                alt=''
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
