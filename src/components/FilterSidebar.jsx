import { useState } from 'react'
import { IconClose, IconFilter } from './Icons.jsx'

const Accordion = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-plum-100 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-plum-900 hover:text-gold-700 transition-colors"
      >
        <span className="eyebrow text-plum-800">{title}</span>
        <span className={`text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`grid transition-all duration-500 ease-silk ${open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

const PriceSlider = ({ value, onChange }) => {
  const [min, max] = value
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-plum-800 mb-3">
        <span>£{min}</span>
        <span>£{max === 5000 ? '5000+' : max}</span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-px bg-plum-200" />
        <div
          className="absolute top-1/2 h-px bg-plum-900"
          style={{ left: `${(min / 5000) * 100}%`, right: `${100 - (max / 5000) * 100}%` }}
        />
        <input
          type="range" min="0" max="5000" step="50" value={min}
          onChange={(e) => onChange([Math.min(+e.target.value, max - 50), max])}
          className="absolute inset-x-0 top-0 w-full h-6 appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-plum-900
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow"
        />
        <input
          type="range" min="0" max="5000" step="50" value={max}
          onChange={(e) => onChange([min, Math.max(+e.target.value, min + 50)])}
          className="absolute inset-x-0 top-0 w-full h-6 appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-plum-900
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow"
        />
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        {[[0, 250], [250, 500], [500, 1000], [1000, 5000]].map(([lo, hi]) => (
          <button
            key={`${lo}-${hi}`}
            onClick={() => onChange([lo, hi])}
            className={`chip ${min === lo && max === hi ? 'chip-active' : ''}`}
          >
            £{lo}{hi === 5000 ? '+' : `–£${hi}`}
          </button>
        ))}
      </div>
    </div>
  )
}

const SizeGrid = ({ all, selected, onToggle }) => (
  <div className="grid grid-cols-4 gap-2">
    {all.map((s) => {
      const active = selected.includes(s)
      return (
        <button
          key={s}
          onClick={() => onToggle(s)}
          className={`border py-2 text-xs tracking-wide transition-all duration-300
            ${active ? 'border-plum-900 bg-plum-900 text-ivory-100' : 'border-plum-200 text-plum-800 hover:border-plum-900'}`}
        >{s}</button>
      )
    })}
  </div>
)

const ColorGrid = ({ all, selected, onToggle }) => (
  <div className="flex flex-wrap gap-3">
    {all.map(({ name, hex }) => {
      const active = selected.includes(name)
      return (
        <button
          key={name}
          onClick={() => onToggle(name)}
          title={name}
          className="group flex flex-col items-center gap-1.5"
        >
          <span className={`w-8 h-8 rounded-full border transition-all duration-300
            ${active ? 'ring-2 ring-offset-2 ring-offset-ivory-50 ring-plum-900 border-ivory-50' : 'border-plum-200 group-hover:scale-110'}`}
            style={{ background: hex }} />
          <span className={`text-[10px] uppercase tracking-wide ${active ? 'text-plum-900' : 'text-plum-500 group-hover:text-plum-800'}`}>
            {name}
          </span>
        </button>
      )
    })}
  </div>
)

const FilterPanel = ({ f, onClose }) => (
  <div className="flex flex-col h-full">
    {onClose && (
      <div className="flex items-center justify-between p-5 border-b border-plum-100">
        <span className="font-display text-xl">Refine</span>
        <button onClick={onClose} aria-label="Close filters" className="text-plum-700 hover:text-plum-900">
          <IconClose className="w-6 h-6" />
        </button>
      </div>
    )}

    <div className={`${onClose ? 'px-5' : ''} overflow-y-auto flex-1`}>
      <Accordion title="Price">
        <PriceSlider value={f.priceRange} onChange={f.setPriceRange} />
      </Accordion>
      <Accordion title="Size">
        <SizeGrid all={f.availableSizes} selected={f.sizes} onToggle={f.toggleSize} />
      </Accordion>
      <Accordion title="Colour">
        <ColorGrid all={f.availableColors} selected={f.colors} onToggle={f.toggleColor} />
      </Accordion>
    </div>

    <div className={`${onClose ? 'p-5 border-t border-plum-100' : 'pt-6'} flex gap-3`}>
      <button onClick={f.reset} className="btn-outline flex-1 !py-3">Clear</button>
      {onClose && <button onClick={onClose} className="btn-primary flex-1 !py-3">Apply</button>}
    </div>
  </div>
)

// Desktop sticky sidebar — place inside the page layout.
export const FilterDesktop = ({ f }) => (
  <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start">
    <FilterPanel f={f} />
  </aside>
)

// Mobile trigger button + slide-in drawer.
export const FilterTrigger = ({ f }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 border border-plum-200 px-4 py-2.5 text-[11px] uppercase tracking-luxe text-plum-800 hover:bg-plum-900 hover:text-ivory-100 hover:border-plum-900 transition-colors"
      >
        <IconFilter className="w-4 h-4" />
        Filters {f.activeCount > 0 && <span className="ml-1">({f.activeCount})</span>}
      </button>

      <div className={`lg:hidden fixed inset-0 z-50 ${mobileOpen ? 'visible' : 'invisible'} transition-all duration-500`}>
        <div className={`absolute inset-0 bg-plum-900/50 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
             onClick={() => setMobileOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-[90%] max-w-sm bg-ivory-50 shadow-2xl transition-transform duration-500 ease-silk ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <FilterPanel f={f} onClose={() => setMobileOpen(false)} />
        </aside>
      </div>
    </>
  )
}

export default FilterTrigger
