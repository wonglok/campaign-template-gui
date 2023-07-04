export function Triangle() {
  return (
    <div
      className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-30 backdrop-blur-md'
      style={{ zIndex: '1000' }}
    >
      <div className='loader-triangle-7'>
        <style
          dangerouslySetInnerHTML={{
            __html: /* css */ `
.loader-triangle-7 #Artboard {
  stroke-dasharray: 0 226;
  animation: anm-tr7-dash 1s ease-in-out alternate infinite;
}

@keyframes anm-tr7-dash {
  from {
    stroke-dasharray: 0 226;
  }
  to {
    stroke-dasharray: 226 0;
  }
}

          `,
          }}
        ></style>
        <svg width='56px' height='50px' viewBox='0 0 226 200' version='1.1'>
          <g id='Page-1' stroke='none' strokeWidth='2' fill='none' fillRule='evenodd'>
            <g
              id='Artboard'
              fillRule='nonzero'
              stroke={'black'}
              // stroke='url(#linearGradient-1)'
              strokeWidth='10'
            >
              <g id='white-bg-logo'>
                <path
                  d='M113,5.08219117 L4.28393801,197.5 L221.716062,197.5 L113,5.08219117 Z'
                  id='Triangle-3-Copy'
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
