import { useEffect, useState } from 'react'
import { IconChevronUp } from './Icons.jsx'

const BackToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed left-5 bottom-5 md:left-6 md:bottom-6 z-40 w-11 h-11 grid place-items-center
                  bg-plum-900 text-ivory-50 hover:bg-gold-500 hover:text-plum-900 shadow-cardHover
                  transition-all duration-500 ease-silk
                  ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <IconChevronUp className="w-5 h-5" />
    </button>
  )
}

export default BackToTop
