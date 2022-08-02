import Link from 'next/link'
import React from 'react'
import { SpotifyLogo, FacebookIcon, GoogleIcon } from '../components/Icon'
export default function SignUp() {
  return (
    <div className='flex flex-col items-center'>
      <SpotifyLogo className='fill-black my-12 w-36' />
      <div className='text-3xl w-96 text-center text-black font-bold mb-8'>
        Đăng ký miễn phí để bắt đầu nghe.
      </div>
      <div className='bg-facebookBg flex py-3 px-20 rounded-full hover:scale-105 hover:font-bold hover:bg-facebookBgActive cursor-pointer mb-6'>
        <FacebookIcon width='24' height='24' />
        <div className='text-white font-semibold ml-4'>Đăng ký bằng Facebook</div>
      </div>
      <div className='border-googleText border-2 flex py-3 px-[5.5rem] rounded-full hover:scale-105 hover:font-bold cursor-pointer mb-6'>
        <GoogleIcon width='24' height='24' />
        <div className='text-googleText font-semibold ml-4'>Đăng ký bằng Google</div>
      </div>
      <div className='tracking-wider font-semibold text-textBreakLine mb-6'>hoặc</div>
      <div className='flex flex-col items-center mb-8'>
        <div className='flex flex-col w-96 mb-4'>
          <div className='text-black font-semibold mb-2'>Email của bạn là gì?</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='email'
            placeholder='Nhập email của bạn.'
          />
        </div>
        <div className='flex flex-col w-96 mb-4'>
          <div className='text-black font-semibold mb-2'>Tạo mật khẩu</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='password'
            placeholder='Tạo mật khẩu.'
          />
        </div>
        <div className='flex flex-col w-96 mb-8'>
          <div className='text-black font-semibold mb-2'>Xác nhận mật khẩu của bạn</div>
          <input
            className='py-3 border-inputBorder border-2 px-4 rounded'
            type='password'
            placeholder='Nhập mật khẩu.'
          />
        </div>
        <div className='bg-activeIconHover text-black font-bold py-4 px-8 rounded-full hover:scale-105 cursor-pointer w-[40%] text-center'>
          Đăng ký
        </div>
      </div>
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
