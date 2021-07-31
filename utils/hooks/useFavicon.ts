import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type FaviconDrawFunc = (
  _context: CanvasRenderingContext2D,
  _canvas: HTMLCanvasElement
) => boolean | string

export type UseFaviconOptions = {
  /**
   * Default icon url to be shown (mainly used if using SSR)
   */
  defaultIcon: string
  /**
   * Width of the canvas
   */
  width: number
  /**
   * Height of the canvas
   */
  height: number
  /**
   * If the hook should automatically update the favicon
   */
  autoSetIcon: boolean
  /**
   * The selector to select the favicon link tag. Used if autoSetIcon is true
   */
  linkTagSelector: string
}

const defaultOptions = {
  defaultIcon: '',
  width: 200,
  height: 200,
  autoSetIcon: false,
  linkTagSelector: 'link[rel="shortcut icon"]'
}

/**
 * Hook to easily create a dynamic favicon
 * @param drawFunc A function which gets the canvas 2d context and canvas and draws the favicon on the canvas. Must return true if the icon should be updated or a string to set that as icon.
 * @param options An object specifying the height and width of the canvas.
 * @returns The dataURL for current favicon.
 */
const useFavicon = (
  drawFunc: FaviconDrawFunc,
  userOptions: Partial<UseFaviconOptions> = defaultOptions
) => {
  const options = useMemo(
    () => ({ ...defaultOptions, ...userOptions }),
    [userOptions]
  )
  const [iconURL, setIconURL] = useState(options.defaultIcon)
  const canvasRef = useRef(
    typeof window === 'undefined' ? undefined : document.createElement('canvas')
  )

  const createOrReplaceFavicon = useCallback(
    (imageHref: string) => {
      const existingTag = document.head.querySelector<HTMLLinkElement>(
        options.linkTagSelector
      )
      if (existingTag) {
        existingTag.href = imageHref
      } else {
        const tag = document.createElement('link')
        tag.rel = 'shortcut icon'
        tag.href = imageHref
        document.head.append(tag)
      }
    },
    [options.linkTagSelector]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    const context = canvasRef.current.getContext('2d')
    if (!context) throw new Error(`Cannot get canvas 2d context`)
    if (options) {
      canvasRef.current.height = options.height
      canvasRef.current.width = options.width
    }
    const change = drawFunc(context, canvasRef.current)
    if (typeof change === 'string') {
      createOrReplaceFavicon(change)
      setIconURL(change)
    } else if (change) {
      const newDataURL = canvasRef.current.toDataURL()
      createOrReplaceFavicon(newDataURL)
      setIconURL(newDataURL)
    }
  }, [createOrReplaceFavicon, drawFunc, options])

  return iconURL
}

export default useFavicon
