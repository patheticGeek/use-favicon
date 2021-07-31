export const isClientSide = typeof window !== 'undefined'

export const isDev = process.env.NODE_ENV === 'development'
