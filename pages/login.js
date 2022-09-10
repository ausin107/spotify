import { useState } from 'react'
import { SpotifyLogo, FacebookIcon, GoogleIcon, SpinIcon, ArrowBackIcon } from '../components/Icon'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { loginSuccess, loginFailed } from '../components/auth/authSlice'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [successMs, setSuccessMs] = useState()
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        window.localStorage.setItem('authKey', user.uid)
        dispatch(loginSuccess(user.uid))
        setEmail('')
        setPassword('')
        setSuccessMs('Login successful !!!')
        setError()
        router.push('/')
        setTimeout(() => {
          router.reload()
        }, 700)
      })
      .catch((err) => {
        dispatch(loginFailed())
        let errorCode = err.code
        errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
        let firstLetter = errorCode[0].toUpperCase()
        errorCode = errorCode.slice(1, errorCode.length)
        setError(firstLetter + errorCode + ' !!!')
        setEmail('')
        setPassword('')
        setLoading(false)
      })
  }
  const handleGGLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user
        window.localStorage.setItem('authKey', user.uid)
        dispatch(loginSuccess(user.uid))
        setSuccessMs('Login successfull !!!')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch((err) => {
        dispatch(loginFailed())
        let errorCode = err.code
        errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
        let firstLetter = errorCode[0].toUpperCase()
        errorCode = errorCode.slice(1, errorCode.length)
        setError(firstLetter + errorCode + ' !!!')
      })
  }
  const handleFBLogin = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user
        window.localStorage.setItem('authKey', user.uid)
        dispatch(loginSuccess(user.uid))
        setError()
        setSuccessMs('Login successfull !!!')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch((err) => {
        dispatch(loginFailed())
        let errorCode = err.code
        errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
        let firstLetter = errorCode[0].toUpperCase()
        errorCode = errorCode.slice(1, errorCode.length)
        setError(firstLetter + errorCode + ' !!!')
      })
  }
  return (
    <div className='flex flex-col items-center overflow-hidden select-none'>
      <SpotifyLogo className='w-48 my-8' />
      <div className='w-screen border-t border-breakLine mb-8'></div>
      <div className='text-black font-bold text-sm mb-4'>To continue, sign in to Spotify.</div>
      <div
        onClick={handleGGLogin}
        className='w-96 uppercase flex bg-facebookBg rounded-full py-3 px-16 text-white mb-4 hover:scale-105 cursor-pointer hover:bg-facebookBgActive'>
        <FacebookIcon className='mr-3' width='24' height='24' />
        continue with Facebook
      </div>
      <div
        onClick={handleFBLogin}
        className='w-96 uppercase flex border-2 py-3 px-20 rounded-full border-googleText text-googleText hover:scale-105 cursor-pointer mb-4'>
        <GoogleIcon className='mr-3' width='24' height='24' />
        continue by google
      </div>
      <div className='text-black uppercase font-bold text-xs mb-6'>or</div>
      {!!error && <div className='alert-danger w-96 px-4 py-3 rounded border-2 mb-4'>{error}</div>}
      {!!successMs && <div className='alert-success w-96 px-4 py-3 rounded border-2 mb-4'>{successMs}</div>}
      <form action='/' className='flex items-center flex-col mb-8' onSubmit={handleSubmit}>
        <div className=' mb-4'>
          <div className='text-black mb-2 font-bold'>Email address</div>
          <input
            className='w-96 py-3 pl-4 border-2 border-inputBorder rounded'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            required
          />
        </div>
        <div className='mb-4'>
          <div className='text-black mb-2 font-bold'>Password</div>
          <input
            className='w-96 py-3 pl-4 border-2 border-inputBorder rounded'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </div>
        <button
          disabled={isLoading}
          type='submit'
          className='w-36 flex items-center justify-center bg-activeIcon hover:bg-activeIconHover hover:scale-105 text-lg font-semibold px-4 py-3 rounded-full'>
          {isLoading && <SpinIcon className='animate-spin -ml-1 mr-3 text-white' width={20} />}
          LOGIN
        </button>
      </form>
      <div className='border-t-2 border-breakLine w-96 mb-8'></div>
      <div className='text-black text-lg font-bold mb-4'>Do not have an account?</div>
      <div
        onClick={() => router.push('/signup')}
        className='uppercase text-googleText text-center text-lg border-2 w-96 border-googleText py-3 px-20 rounded-full mb-14 cursor-pointer hover:scale-105'>
        Subscribe to Spotify
      </div>
      <ArrowBackIcon
        width='24'
        height='24'
        className='absolute top-4 left-4 fill-black block lg:hidden'
        onClick={() => router.back()}
      />
    </div>
  )
}
Login.getLayout = (page) => page
