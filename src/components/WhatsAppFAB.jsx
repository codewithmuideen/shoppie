import { IconWhatsApp } from './Icons.jsx'
import { buildGeneralWhatsAppLink } from '../utils/format.js'

const WhatsAppFAB = () => (
  <a
    href={buildGeneralWhatsAppLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-40 group"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
    <span className="relative inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full pl-3 pr-4 py-3 shadow-cardHover transition-all duration-500 ease-silk group-hover:pr-5">
      <IconWhatsApp className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[160px] transition-[max-width] duration-500 text-[11px] font-semibold uppercase tracking-luxe">
        Order on WhatsApp
      </span>
    </span>
  </a>
)

export default WhatsAppFAB
