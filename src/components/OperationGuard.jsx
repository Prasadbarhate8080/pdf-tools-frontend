'use client'

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { resetOperationState } from '@/store/operationStateSlice'

export default function OperationGuard() {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const operationState = useSelector(
    (state) => state.operationState.operationState
  )

  const isBusy = [
    'uploading',
    'processing',
    'waiting',
    'inOperation'
  ].includes(operationState)

  const busyRef = useRef(isBusy)
  const navigatingRef = useRef(false)

  // Keep busy state updated
  useEffect(() => {
    busyRef.current = isBusy
  }, [isBusy])

  // Reset navigation lock whenever route changes
  useEffect(() => {
    navigatingRef.current = false
  }, [pathname])

  // Intercept internal navigation
  useEffect(() => {
    const handleClick = (event) => {
      if (!busyRef.current || navigatingRef.current) return
      if (!(event.target instanceof Element)) return

      const link = event.target.closest('a[href]')
      if (!link) return

      if (
        link.target === '_blank' ||
        link.hasAttribute('download') ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) return

      const url = new URL(link.href)

      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      ) return

      event.preventDefault()
      event.stopPropagation()

      const shouldLeave = window.confirm(
        'Your PDF operation is still in progress. Are you sure you want to leave this page?'
      )

      if (!shouldLeave) return

      navigatingRef.current = true
      busyRef.current = false

      dispatch(resetOperationState())

      router.push(url.pathname + url.search + url.hash)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [dispatch, router])

  // Browser refresh / tab close protection
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!busyRef.current) return

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}