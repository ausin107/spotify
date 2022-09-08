export const SpotifyLogo = ({ className, onClick }) => {
  return (
    <svg viewBox='0 0 1134 340' className={className} onClick={onClick}>
      <title>Spotify</title>
      <path
        fill='currentColor'
        d='M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z'></path>
    </svg>
  )
}
export const HomeIcon = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <title>Trang chủ</title>
      <path d='M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z'></path>
    </svg>
  )
}
export const HomeIconActive = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <path d='M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z'></path>
    </svg>
  )
}
export const SearchIcon = ({ className, height, width }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 24 24'>
      <path d='M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z'></path>
    </svg>
  )
}
export const SearchIconActive = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <path d='M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z'></path>
      <path d='M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z'></path>
    </svg>
  )
}
export const LibraryIcon = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <path d='M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z'></path>
    </svg>
  )
}
export const LibraryIconActive = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <path d='M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z'></path>
    </svg>
  )
}
export const PlusIcon = ({ className }) => {
  return (
    <svg role='img' height='12' width='12' aria-hidden='true' viewBox='0 0 16 16' className={className}>
      <path d='M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z'></path>
    </svg>
  )
}
export const LoveIcon = ({ className }) => {
  return (
    <svg role='img' height='12' width='12' aria-hidden='true' viewBox='0 0 16 16' className={className}>
      <path d='M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z'></path>
    </svg>
  )
}
export const BackIcon = ({ className, onClick }) => {
  return (
    <svg role='img' height='24' width='24' className={className} onClick={onClick} viewBox='0 0 24 24'>
      <path d='M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z'></path>
    </svg>
  )
}
export const NextIcon = ({ className }) => {
  return (
    <svg role='img' height='24' width='24' className={className} viewBox='0 0 24 24'>
      <path d='M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z'></path>
    </svg>
  )
}
export const PlayIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} onClick={onClick} viewBox='0 0 16 16' className={className}>
      <path d='M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z'></path>
    </svg>
  )
}
export const PauseIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} onClick={onClick} viewBox='0 0 16 16' className={className}>
      <path d='M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z'></path>
    </svg>
  )
}
export const MixMusic = ({ className, width, height, iconRef }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className} ref={iconRef}>
      <path d='M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z'></path>
      <path d='M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z'></path>
    </svg>
  )
}
export const BackMusic = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z'></path>
    </svg>
  )
}

export const NextMusic = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z'></path>
    </svg>
  )
}

export const LoopMusic = ({ className, width, height, iconRef }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className} ref={iconRef}>
      <path d='M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z'></path>
    </svg>
  )
}
export const LoveMusic = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z'></path>
    </svg>
  )
}
export const LoveMusicActive = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z'></path>
    </svg>
  )
}
export const MinimizeBrowserIcon = ({ className, width, height, onClick, pipRef }) => {
  return (
    <svg
      height={height}
      width={width}
      className={className}
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      ref={pipRef}>
      <g>
        <path d='M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'></path>
        <path d='M10 8h4v3h-4z'></path>
      </g>
    </svg>
  )
}
export const VolumeIconMuted = ({ className, width, height }) => {
  return (
    <svg role='presentation' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z'></path>
      <path d='M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z'></path>
    </svg>
  )
}
export const VolumeIconLow = ({ className, width, height }) => {
  return (
    <svg role='presentation' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z'></path>
    </svg>
  )
}
export const VolumeIconMedium = ({ className, width, height }) => {
  return (
    <svg role='presentation' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z'></path>
    </svg>
  )
}
export const VolumeIconHigh = ({ className, width, height }) => {
  return (
    <svg role='presentation' height={height} width={width} viewBox='0 0 16 16' className={className}>
      <path d='M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z'></path>
      <path d='M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z'></path>
    </svg>
  )
}
export const FacebookIcon = ({ className, width, height }) => {
  return (
    <svg
      height={height}
      width={width}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width='24' height='24' fill='url(#pattern0)'></rect>
      <defs>
        <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use href='#image0_213_540' transform='scale(0.00769231)'></use>
        </pattern>
        <image
          id='image0_213_540'
          width='130'
          height='130'
          href='data:image/png;base64,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'
        />
      </defs>
    </svg>
  )
}
export const GoogleIcon = ({ className, width, height }) => {
  return (
    <svg
      height={height}
      width={width}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.6 12.2272C21.6 11.5181 21.5364 10.8363 21.4182 10.1818H12V14.0499H17.3818C17.15 15.2999 16.4455 16.359 15.3864 17.0681V19.5772H18.6182C20.5091 17.8363 21.6 15.2727 21.6 12.2272Z'
        fill='#4285F4'></path>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 21.9999C14.7 21.9999 16.9636 21.1044 18.6181 19.5772L15.3863 17.0681C14.4909 17.6681 13.3454 18.0226 12 18.0226C9.39542 18.0226 7.19087 16.2635 6.40451 13.8999H3.0636V16.4908C4.70905 19.759 8.09087 21.9999 12 21.9999Z'
        fill='#34A853'></path>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.40455 13.9001C6.20455 13.3001 6.09091 12.6592 6.09091 12.0001C6.09091 11.341 6.20455 10.7001 6.40455 10.1001V7.50916H3.06364C2.38636 8.85916 2 10.3864 2 12.0001C2 13.6137 2.38636 15.141 3.06364 16.491L6.40455 13.9001Z'
        fill='#FBBC05'></path>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 5.97727C13.4681 5.97727 14.7863 6.48182 15.8227 7.47273L18.6909 4.60455C16.9591 2.99091 14.6954 2 12 2C8.09087 2 4.70905 4.24091 3.0636 7.50909L6.40451 10.1C7.19087 7.73636 9.39542 5.97727 12 5.97727Z'
        fill='#EA4335'></path>
    </svg>
  )
}
export const SpinIcon = ({ className, width, height }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
    </svg>
  )
}
export const UserIcon = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 16 16'>
      <path d='M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z'></path>
    </svg>
  )
}
export const LogoutIcon = ({ className, width, height }) => {
  return (
    <svg height={height} width={width} className={className} viewBox='0 0 512 512'>
      <path
        fill='currentColor'
        d='M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z'></path>
    </svg>
  )
}
export const EmptyIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 24 24'>
      <path d='M3.293 3.293a1 1 0 011.414 0L12 10.586l7.293-7.293a1 1 0 111.414 1.414L13.414 12l7.293 7.293a1 1 0 01-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 01-1.414-1.414L10.586 12 3.293 4.707a1 1 0 010-1.414z'></path>
    </svg>
  )
}
export const Next15s = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 16 16'>
      <path d='M13.536 4.5h-1.473a.75.75 0 100 1.5H16V2.063a.75.75 0 00-1.5 0v1.27A8.25 8.25 0 103.962 15.887a.75.75 0 10.827-1.25A6.75 6.75 0 1113.535 4.5z'></path>
      <path d='M6.303 8.407c.79 0 1.214-.52 1.214-.907h1.5v8h-1.5V9.907H6v-1.5h.303zm4.832-.911h4.05v1.5H12.33l-.245 1.067c.256-.071.525-.11.804-.11 1.621 0 2.954 1.3 2.954 2.924 0 1.624-1.333 2.923-2.954 2.923a2.945 2.945 0 01-2.93-2.54l1.487-.197c.092.69.696 1.237 1.443 1.237.813 0 1.454-.647 1.454-1.423s-.64-1.423-1.454-1.423c-.49 0-.92.235-1.183.594l-.01.014-.206.254-1.314-.639.96-4.181z'></path>
    </svg>
  )
}
export const Back15s = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 16 16'>
      <path d='M2.464 4.5h1.473a.75.75 0 110 1.5H0V2.063a.75.75 0 011.5 0v1.27a8.25 8.25 0 1110.539 12.554.75.75 0 01-.828-1.25A6.75 6.75 0 102.464 4.5z'></path>
      <path d='M.303 8.407c.79 0 1.214-.52 1.214-.907h1.5v8h-1.5V9.907H0v-1.5h.303zm4.832-.911h4.05v1.5H6.33l-.245 1.067c.256-.071.525-.11.804-.11 1.621 0 2.954 1.3 2.954 2.924C9.843 14.5 8.51 15.8 6.89 15.8a2.945 2.945 0 01-2.93-2.54l1.487-.197c.092.69.696 1.237 1.443 1.237.813 0 1.454-.647 1.454-1.423s-.64-1.423-1.454-1.423c-.49 0-.92.235-1.183.594l-.01.014-.206.254-1.314-.639.96-4.181z'></path>
    </svg>
  )
}
export const ClockIcon = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 16 16'>
      <path d='M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z'></path>
      <path d='M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z'></path>
    </svg>
  )
}
export const MusicIcon = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} viewBox='0 0 24 24'>
      <path d='M15 4v12.167a3.5 3.5 0 11-3.5-3.5H13V4h2zm-2 10.667h-1.5a1.5 1.5 0 101.5 1.5v-1.5z'></path>
    </svg>
  )
}
export const EditIcon = ({ className, width, height }) => {
  return (
    <svg role='img' height={height} width={width} className={className} aria-hidden='true' viewBox='0 0 24 24'>
      <path d='M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z'></path>
    </svg>
  )
}
export const MusicIconV2 = ({ className, width, height }) => {
  return (
    <svg height={height} width={width} className={className} viewBox='0 0 80 81' xmlns='http://www.w3.org/2000/svg'>
      <title>Playlist Icon</title>
      <path
        className={className}
        d='M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z'
        fill='currentColor'
        fillRule='evenodd'></path>
    </svg>
  )
}
export const TrashCanIcon = ({ className }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' className={className}>
      <path
        fill='currentColor'
        d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'></path>
    </svg>
  )
}
export const Playlists = ({ className, width, height, onClick, iconRef }) => {
  return (
    <svg
      role='img'
      height={height}
      width={width}
      className={className}
      onClick={onClick}
      ref={iconRef}
      viewBox='0 0 16 16'>
      <path d='M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z'></path>
    </svg>
  )
}
export const OptionIcons = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 24 24'>
      <path d='M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'></path>
    </svg>
  )
}
export const SpotifySmallIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} size='24' viewBox='0 0 24 24'>
      <path d='M12 1a11 11 0 100 22 11 11 0 000-22zm5.045 15.866a.686.686 0 01-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 01-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 01.228.943zm1.346-2.995a.858.858 0 01-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 01-1.11-.904.858.858 0 01.611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 01.283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 01-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 01-1.05 1.77z'></path>
    </svg>
  )
}
export const ClosePlayerIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 24 24'>
      <path d='M2.793 8.043a1 1 0 011.414 0L12 15.836l7.793-7.793a1 1 0 111.414 1.414L12 18.664 2.793 9.457a1 1 0 010-1.414z'></path>
    </svg>
  )
}
export const ConnectDevice = ({ className, width, height, onClick }) => {
  return (
    <svg viewBox='0 0 232 100' className={className}>
      <title>Connect</title>
      <defs>
        <clipPath transform='translate(-64 -123.45)'>
          <circle cx='284.93' cy='215.43' r='.96' fill='none'></circle>
        </clipPath>
        <clipPath id='devices-path-b' transform='translate(-64 -123.45)'>
          <path fill='none' d='M0 0h360v640H0z'></path>
        </clipPath>
      </defs>
      <path
        fill='currentColor'
        d='M0 94.1h89.32v2H0zm174-59.38h-2V3.65H44.02v30.24h-2V1.65H174v33.07zm-73.5 59.33h24.02v2H100.5z'></path>
      <g clipPath='url(#devices-path-a)'>
        <g clipPath='url(#devices-path-b)'>
          <path fill='currentColor' d='M214.97 86.02h11.93v11.92h-11.93z'></path>
        </g>
      </g>
      <path d='M160.28 77.73a2.09 2.09 0 1 0 2.1 2.09 2.1 2.1 0 0 0-2.1-2.09z' fill='currentColor'></path>
      <path
        d='M172.55 92.1l-3.86-18.13a5.84 5.84 0 0 0-5.71-4.62H141.7a5.84 5.84 0 0 0-5.71 4.62l-3.86 18.13a5.15 5.15 0 0 0 4 6.11 6.55 6.55 0 0 0 6.34-2.15l4.5-5.26h10.81l4.5 5.26a6.54 6.54 0 0 0 6.34 2.15 5.15 5.15 0 0 0 4-6.11zm-2.31 2.84a3.24 3.24 0 0 1-2.05 1.41 4.67 4.67 0 0 1-4.5-1.52l-4.57-5.34-.49-.58h-12.57L141 94.83a4.66 4.66 0 0 1-4.5 1.53 3.26 3.26 0 0 1-2.51-3.86l3.86-18.13a4 4 0 0 1 3.86-3.13H163a4 4 0 0 1 3.86 3.13l3.86 18.13a3.22 3.22 0 0 1-.48 2.44z'
        fill='currentColor'></path>
      <path
        d='M145.6 79.12v-2.79h-1.9v2.79h-2.8v1.9h2.8v2.79h1.9v-2.79h2.8v-1.9zm41.15 11.43a12.54 12.54 0 1 1 12.55-12.54 12.56 12.56 0 0 1-12.55 12.54zm0-23.08a10.54 10.54 0 1 0 10.55 10.54 10.56 10.56 0 0 0-10.55-10.51z'
        fill='currentColor'></path>
      <circle cx='187.24' cy='53.03' r='1.44' fill='currentColor'></circle>
      <path
        d='M202.85 37.13H169.7a4.65 4.65 0 0 0-4.64 4.65v25.9h2v-25.9a2.65 2.65 0 0 1 2.64-2.65h33.15a2.65 2.65 0 0 1 2.64 2.65v51.77a2.66 2.66 0 0 1-2.66 2.65h-28.1v2h28.1a4.66 4.66 0 0 0 4.66-4.65V41.78a4.65 4.65 0 0 0-4.64-4.65zm26.72 28.42h-17.28a2.44 2.44 0 0 0-2.43 2.43v27.35a2.43 2.43 0 0 0 2.43 2.43h17.28a2.44 2.44 0 0 0 2.43-2.43V67.97a2.43 2.43 0 0 0-2.43-2.42zm.43 29.78a.44.44 0 0 1-.43.43h-17.28a.43.43 0 0 1-.43-.43V67.97a.44.44 0 0 1 .43-.43h17.28a.43.43 0 0 1 .43.43zM86.25 83.04h45.63v2H86.25zM80.1 36.21H7.73a2.43 2.43 0 0 0-2.43 2.43v45.84a3.66 3.66 0 0 0 3.65 3.65H80.1a3.65 3.65 0 0 0 3.65-3.65V39.86a3.66 3.66 0 0 0-3.65-3.65zm1.65 48.28a1.65 1.65 0 0 1-1.65 1.65H8.95a1.65 1.65 0 0 1-1.65-1.65V38.64a.43.43 0 0 1 .43-.44H80.1a1.65 1.65 0 0 1 1.65 1.65z'
        fill='currentColor'></path>
      <path fill='none' d='M0 0h232v100H0z'></path>
    </svg>
  )
}
export const ConnectIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 16 16'>
      <path d='M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15h-6.5A1.75 1.75 0 016 13.25V2.75zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25h-6.5zm-6 0a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 010 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z'></path>
      <path d='M13 10a2 2 0 11-4 0 2 2 0 014 0zm-1-5a1 1 0 11-2 0 1 1 0 012 0z'></path>
    </svg>
  )
}
export const ShareIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 16 16'>
      <path d='M12.875 2a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.25 3.125a2.625 2.625 0 11.754 1.841L5.75 8l5.254 3.034a2.625 2.625 0 11-.704 1.326l-5-2.889a2.625 2.625 0 110-2.943l5-2.888a2.634 2.634 0 01-.051-.516zm-7.125 3.75a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm9.75 4.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'></path>
    </svg>
  )
}
export const ArrowBackIcon = ({ className, width, height, onClick }) => {
  return (
    <svg role='img' height={height} width={width} className={className} onClick={onClick} viewBox='0 0 24 24'>
      <path d='M13.414 3.5a.999.999 0 00-1.707-.707l-9.207 9.2 9.207 9.202a1 1 0 101.414-1.413L6.335 13H20.5a1 1 0 000-2H6.322l6.799-6.794a.999.999 0 00.293-.707z'></path>
    </svg>
  )
}
