import Link from 'next/link'
import { SpinIcon } from '../components/Icon'
import { useState } from 'react'
import { SpotifyLogo, FacebookIcon, GoogleIcon } from '../components/Icon'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginFailed } from '../components/auth/authSlice'
export default function SignUp() {
  const [error, setError] = useState()
  const [successMs, setSuccessMs] = useState()
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCF, setPasswordCF] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (password !== passwordCF) {
      setError("Password doesn't match !!!")
      setPassword('')
      setPasswordCF('')
      setLoading(false)
    } else if (password.length < 6) {
      setError('Password too short !!!')
      setLoading(false)
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSuccessMs('Sign up successfull !!!')
          setEmail('')
          setPassword('')
          setPasswordCF('')
          setError()
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        })
        .catch((err) => {
          let errorCode = err.code
          errorCode = errorCode.replace('auth/', '').replaceAll('-', ' ').trim()
          let firstLetter = errorCode[0].toUpperCase()
          errorCode = errorCode.slice(1, errorCode.length)
          setError(firstLetter + errorCode + ' !!!')
          setEmail('')
          setPassword('')
          setPasswordCF('')
          setLoading(false)
        })
    }
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
    <div className='flex flex-col items-center select-none'>
      <SpotifyLogo className='fill-black my-12 w-36' />
      <div className='text-3xl w-96 text-center text-black font-bold mb-8'>Đăng ký miễn phí để bắt đầu nghe.</div>
      <div
        onClick={handleFBLogin}
        className='bg-facebookBg flex py-3 px-20 rounded-full hover:scale-105 hover:font-bold hover:bg-facebookBgActive cursor-pointer mb-6'>
        <FacebookIcon width='24' height='24' />
        <div className='text-white font-semibold ml-4'>Tiếp tục với Facebook</div>
      </div>
      <div
        onClick={handleGGLogin}
        className='border-googleText border-2 flex py-3 px-[5.5rem] rounded-full hover:scale-105 hover:font-bold cursor-pointer mb-6'>
        <GoogleIcon width='24' height='24' />
        <div className='text-googleText font-semibold ml-4'>Tiếp tục với Google</div>
      </div>
      <div className='tracking-wider font-semibold text-textBreakLine mb-6'>hoặc</div>
      {!!error && <div className='alert-danger w-96 px-4 py-3 rounded border-2 mb-4'>{error}</div>}
      {!!successMs && <div className='alert-success w-96 px-4 py-3 rounded border-2 mb-4'>{successMs}</div>}
      <form className='flex flex-col items-center mb-8' action='/login' onSubmit={handleSubmit}>
        <div className='flex flex-col w-96 mb-4'>
          <div className='text-black font-semibold mb-2'>Email của bạn là gì?</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Nhập email của bạn.'
            required
          />
        </div>
        <div className='flex flex-col w-96 mb-4'>
          <div className='text-black font-semibold mb-2'>Tạo mật khẩu</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Tạo mật khẩu.'
            required
          />
        </div>
        <div className='flex flex-col w-96 mb-8'>
          <div className='text-black font-semibold mb-2'>Xác nhận mật khẩu của bạn</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='password'
            value={passwordCF}
            onChange={(e) => setPasswordCF(e.target.value)}
            placeholder='Nhập mật khẩu.'
            required
          />
        </div>
        <button
          disabled={isLoading}
          type='submit'
          className='bg-activeIconHover text-black font-bold py-4 px-8 rounded-full hover:scale-105 cursor-pointer w-[45%] text-center flex items-center justify-center'>
          {isLoading && <SpinIcon />}
          Đăng ký
        </button>
      </form>
      <div className='mb-40 text-black font-semibold flex'>
        Bạn có tài khoản?
        <Link href='/login'>
          <div className='text-activeIcon ml-1 underline underline-offset-1 cursor-pointer hover:text-activeIconHover'>
            Đăng nhập
          </div>
        </Link>
        .
      </div>
    </div>
  )
}
SignUp.getLayout = (page) => page
