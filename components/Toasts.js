import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotShow } from './toast/toastSlice'
export default function Toasts() {
  const isShow = useSelector((state) => state.toast.isShow)
  const toastMess = useSelector((state) => state.toast.toastMess)
  const dispatch = useDispatch()
  const newClass = 'fixed bottom-32 w-full flex justify-center transition-all duration-500 opacity-100 z-40' + isShow

  useEffect(() => {
    const handleToast = setTimeout(() => {
      dispatch(setNotShow())
    }, 4000)
    return () => {
      clearTimeout(handleToast)
    }
  }, [isShow])

  return (
    <div className={newClass}>
      <div className='py-3 px-6 rounded font-semibold text-white flex items-center justify-center bg-toastsBg shadow-xl lg:w-1/5 sm:w-[30%]'>
        {toastMess}
      </div>
    </div>
  )
}
