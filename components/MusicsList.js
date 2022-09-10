import PlayListItem from './PlayListItem'
import { ClockIcon } from './Icon'
export default function MusicsList({ data, path }) {
  return (
    <div>
      <div className='lg:flex px-6 pb-2 hidden'>
        <div className='text-iconColor text-sm w-[3%]'>#</div>
        <div className='text-iconColor text-sm w-2/5'>NAME</div>
        <div className='text-iconColor text-sm w-1/4'>ALBUM</div>
        <div className='text-iconColor text-sm w-1/5'>DATE</div>
        <div className='text-iconColor text-sm w-[7%] flex justify-end'>
          <ClockIcon width='16' height='16' className='fill-iconColor hover:fill-white' />
        </div>
        <div className='text-iconColor text-sm w-[3%]'></div>
      </div>
      <div className='lg:border-t border-searchChildBg flex flex-col sm:pt-4 pb-16'>
        {data.map((item, index) => {
          return <PlayListItem key={index} data={item} path={path} index={index} />
        })}
      </div>
    </div>
  )
}
