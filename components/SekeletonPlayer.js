import { MixMusic, BackMusic, PlayIcon, NextMusic, VolumeIconMedium, LoopMusic, Playlists } from './Icon'
import Duration from './Duration'
export default function SekeletonPlayer() {
  return (
    <div className=' w-screen h-[6.5rem] bg-itemBg border-t-[0.5px] border-itemActiveBg px-4 pr-8 py-2'>
      <div className='flex flex-row h-full items-center'>
        <div className='w-[20%]'></div>
        <div className='flex flex-col items-center justify-around w-[65%] h-full'>
          <div className='flex items-center'>
            <div className='px-3'>
              <MixMusic className='fill-disableBtn' width='16' height='16' />
            </div>
            <div className='px-3 pr-6'>
              <BackMusic className='fill-disableBtn' width='16' height='16' />
            </div>
            <div className='bg-disableBtn p-2 w-fit rounded-full hover:scale-105'>
              <PlayIcon width='16' height='16' />
            </div>
            <div className='px-3 pl-6'>
              <NextMusic className='fill-disableBtn' width='16' height='16' />
            </div>
            <div className='px-3'>
              <LoopMusic className='fill-disableBtn' width='16' height='16' />
            </div>
          </div>
          <div className='flex items-center'>
            <Duration time={0} className='text-navbarColor text-xs' />
            <input className='w-[32rem] h-1 mx-2' type='range' disabled value={0} id='music-time-input' />
            <Duration time={0} className='text-navbarColor text-xs' />
          </div>
        </div>
        <div className='flex w-[15%] justify-center'>
          <Playlists width='16' height='16' className='fill-musicPlayer hover:fill-white mr-4' />
          <div className='flex items-center'>
            <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />
            <input
              className='w-24 h-1 mx-2 cursor-pointer'
              type='range'
              min={0}
              max={1}
              step='any'
              disabled
              id='music-volume-input'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
