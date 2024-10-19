import { RefObject, useCallback } from "react"

const useSmoothScroll = (duration: number = 800): ((targetRef: RefObject<HTMLElement>) => void) => {
  const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const smoothScroll = useCallback(
    (targetRef: RefObject<HTMLElement>) => {
      if (!targetRef.current) return

      const targetPosition = targetRef.current.getBoundingClientRect().top + window.pageYOffset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const scrollStep = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const scrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, duration)

        window.scrollTo(0, scrollPosition)

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollStep)
        }
      }

      requestAnimationFrame(scrollStep)
    },
    [duration]
  )

  return smoothScroll
}

export default useSmoothScroll
