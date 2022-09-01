export default function ChannelRow({ artistData }) {
  return (
    <div className='px-8 mb-8'>
      <div className='text-white text-2xl mb-7 font-bold'>Artists</div>
      <div className='flex'>
        {artistData.map((item, index) => {
          if (index < 6) {
            return (
              <div
                key={index}
                className='mr-4 w-full group bg-itemBg hover:bg-itemActiveBg rounded px-5 py-5 relative transition-all duration-300'>
                <img className='rounded-full mb-4 shadow-2xl' src={item.snippet.thumbnails.medium.url} alt='' />
                <div className='text-white font-bold mb-1'>{item.snippet.title.replace('Official', '').trim()}</div>
                <div className='text-iconColor text-sm font-bold mb-4'>Artist</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
