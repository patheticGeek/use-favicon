import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Footer from '@components/Footer'
import useFavicon, { FaviconDrawFunc } from '@utils/hooks/useFavicon'

const Home = () => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const subs = setInterval(() => {
      setTick((_tick) => _tick + 1)
    }, 1000)

    return () => {
      clearInterval(subs)
    }
  }, [])

  const drawFavicon: FaviconDrawFunc = useCallback(
    (context) => {
      const array = 'FUCKYOU.'.split('')
      const idx = tick % array.length
      if (array[idx] === '.') {
        return `https://fav.farm/🌚`
      }
      context.font = '180px Arial'
      context.fillStyle = '#fff'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(array[idx], 100, 100)

      return true
    },
    [tick]
  )

  const options = useMemo(
    () => ({
      defaultIcon: '/favicon.ico',
      autoSetIcon: true,
      linkTagSelector: 'link[rel="icon"]'
    }),
    []
  )

  useFavicon(drawFavicon, options)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-8">useFavicon</h1>

        <p className="mb-8">
          Copy the hook from{' '}
          <code className="py-1.5 px-2 bg-gray-100 rounded-lg">
            utils/hooks/useFavicon.js
          </code>
          <br />
        </p>

        <div className="flex justify-center flex-wrap">
          <a
            href="https://github.com/patheticGeek/pg-nextjs-boilerplate"
            className="w-80 p-6 border border-gray-300 hover:border-gray-600 transition-all rounded-lg m-2">
            <h2 className="text-2xl mb-3">Open on GitHub &rarr;</h2>
            <p>Checkout the code</p>
          </a>
          <a
            href="https://github.com/patheticGeek/pg-nextjs-boilerplate/fork"
            className="w-80 p-6 border border-gray-300 hover:border-gray-600 transition-all rounded-lg m-2">
            <h2 className="text-2xl mb-3">Fork on GitHub &rarr;</h2>
            <p>Start developing now!</p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
