import React, { createContext, useContext, useMemo, useState } from 'react'

const UICtx = createContext(null)

export const UIProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const value = useMemo(
    () => ({
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false)
    }),
    [searchOpen, menuOpen]
  )
  return <UICtx.Provider value={value}>{children}</UICtx.Provider>
}

export const useUI = () => {
  const ctx = useContext(UICtx)
  if (!ctx) throw new Error('useUI must be used inside UIProvider')
  return ctx
}
