'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'

type SnackbarItem = { id: number; message: string }

type SnackbarContextValue = {
  enqueueSnackbar: (message: string) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a Snackbar provider')
  }
  return context
}

export default function Snackbar({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<SnackbarItem[]>([])
  const counter = useRef(0)

  const remove = useCallback((id: number) => {
    setSnacks((current) => current.filter((snack) => snack.id !== id))
  }, [])

  const enqueueSnackbar = useCallback(
    (message: string) => {
      const id = ++counter.current
      setSnacks((current) => [...current, { id, message }])
      setTimeout(() => remove(id), 3000)
    },
    [remove]
  )

  const value = useMemo(() => ({ enqueueSnackbar }), [enqueueSnackbar])

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div className='toast-stack'>
        {snacks.map((snack) => (
          <div
            key={snack.id}
            className='alert alert-info toast-item'
            onClick={() => remove(snack.id)}
          >
            <span>{snack.message}</span>
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}
