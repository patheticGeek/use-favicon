# useFavicon

> A simple react hook to show a dynamic favicon

## Getting Started

Install and run the dev server

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Gimme the code

Open the `utils/hooks/useFavicon.ts` and copy that file over and boom you have it.

## How to use?

Let's say we want to show FUCKYOU letter by letter in our favicon

```tsx
const Example = () => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    // Tick every 1s
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
      console.log(idx)
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
      autoSetIcon: true
    }),
    []
  )

  const iconURL = useFavicon(drawFavicon, options)

  return null
}
```

> NOTE: Do remember the `useCallback` and `useMemo` because every time your draw function or options change the icon is created again

The hook returns the icon url so if you are using some library to manage head tags

## Options

| Option          | Type    | Default                   | Info                                                                     |
| --------------- | ------- | ------------------------- | ------------------------------------------------------------------------ |
| defaultIcon     | string  | null                      | Default icon url to be shown (mainly used if using SSR)                  |
| width           | number  | 200                       | Width of the canvas                                                      |
| height          | number  | 200                       | Height of the canvas                                                     |
| autoSetIcon     | boolean | false                     | If the hook should automatically update the favicon                      |
| linkTagSelector | string  | link[rel="shortcut icon"] | The selector to select the favicon link tag. Used if autoSetIcon is true |
