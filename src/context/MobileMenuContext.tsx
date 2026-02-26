import { createContext, useContext, useState, type ReactNode } from 'react'

interface MobileMenuContextType {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
})

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MobileMenuContext.Provider value={{ isOpen, openMenu: () => setIsOpen(true), closeMenu: () => setIsOpen(false) }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  return useContext(MobileMenuContext)
}
