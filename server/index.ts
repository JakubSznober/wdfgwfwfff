import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import settingRoutes from './routes/settings.js'
import orderRoutes from './routes/orders.js'
import contactRoutes from './routes/contact.js'
import blogRoutes from './routes/blog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

// Allow requests from the Vite dev server and production domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/settings', settingRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// In production serve the built Vite frontend
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`BlissBone API draait op http://localhost:${PORT}`)
})
