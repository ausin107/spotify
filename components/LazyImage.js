import { useRef, useEffect } from 'react'
export default function LazyImage({ lazySrc, className, alt }) {
  const imgRef = useRef()
  useEffect(() => {
    const img = imgRef.current
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute('src', lazySrc)
        img.removeAttribute('lazy-src')
      }
    })
    observer.observe(img)
    return () => {
      observer.unobserve(img)
    }
  }, [lazySrc])
  return <img draggable={false} lazy-src={lazySrc} className={className} alt={alt} ref={imgRef} />
}
