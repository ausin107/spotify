import { useState } from 'react'
import { EmptyIcon, MusicIconV2 } from './Icon'
import { useDispatch, useSelector } from 'react-redux'
import { updateSinglePlaylistsInfo, getAllPlaylistsInfo } from '../lib/firebaseAction'
import { loadAllPlaylist } from './playlists/playlistSlice'
export default function EditPlaylistDetail({ currentData, path, handleClose }) {
  const [title, setTitle] = useState(currentData.title)
  const [description, setDescription] = useState(currentData.description || '')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      description: description,
      title: title,
    }
    await updateSinglePlaylistsInfo(path, data)
    const result = await getAllPlaylistsInfo(`collection/${authKey}/playlists`)
    dispatch(loadAllPlaylist(result))
    handleClose()
  }
  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center'>
      <div className='bg-black opacity-70 w-screen h-screen relative' onClick={handleClose}></div>
      <div className='bg-logoutBg rounded-lg py-8 sm:px-6 px-4 absolute'>
        <div className='text-white font-bold text-2xl mb-7'>Edit details</div>
        <form className='' onSubmit={handleSubmit}>
          <div className='flex sm:flex-row flex-col items-center sm:items-stretch mb-3'>
            <div className='w-44 h-44 shadow-3xl bg-itemActiveBg flex items-center justify-center sm:mr-4 mb-4 sm:mb-0'>
              <MusicIconV2 width='65' height='65' className='fill-textBreakLine' />
            </div>
            <div className='flex flex-col w-full sm:w-fit'>
              <input
                className='rounded mb-3 bg-searchChildBg text-white text-sm font-semibold py-2 px-2 sm:w-72 outline-none focus:border focus:bg-inputPlBg focus:border-inputPlBorder'
                placeholder='Add a name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
                tabIndex={0}
              />
              <textarea
                className='bg-searchChildBg text-white py-2 px-2 sm:w-72 sm:h-full h-24 text-sm font-semibold rounded resize-none outline-none focus:border focus:bg-inputPlBg focus:border-inputPlBorder'
                placeholder='Add an optional description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                tabIndex={0}
              />
            </div>
          </div>
          <div className='w-full flex justify-end mb-2'>
            <button type='submit' className='py-3 px-7 text-black font-semibold bg-white rounded-full hover:scale-105'>
              Save
            </button>
          </div>
        </form>
        <div className='text-white text-xs font-semibold'>
          By continuing, you agree to allow Spotify to access the images to upload.
        </div>
        <EmptyIcon
          width='18'
          height='18'
          className='absolute top-0 right-0 fill-iconColor hover:fill-white mt-8 mr-6 cursor-pointer'
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
