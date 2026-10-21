import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const app = express()
const port = Number(process.env.PORT || 8787)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin is not allowed'))
  },
}))
app.use(express.json({ limit: '20kb' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false }))

app.post('/api/enquiries', (req, res) => {
  const { name, email, phone = '', service = '', budget = '', description } = req.body || {}
  const errors = {}
  if (typeof name !== 'string' || name.trim().length < 2) errors.name = 'Name is required.'
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'A valid email is required.'
  if (typeof description !== 'string' || description.trim().length < 10) errors.description = 'A project description is required.'

  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the highlighted fields.', errors })

  const enquiry = {
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 200),
    phone: String(phone).trim().slice(0, 40),
    service: String(service).trim().slice(0, 120),
    budget: String(budget).trim().slice(0, 80),
    description: description.trim().slice(0, 5000),
  }

  if (!process.env.CONTACT_EMAIL) {
    return res.status(503).json({ message: 'Contact delivery is not configured yet. Please use WhatsApp for a direct enquiry.' })
  }

  console.info('Validated enquiry received', { ...enquiry, receivedAt: new Date().toISOString() })
  return res.status(202).json({ message: 'Your enquiry has been received. We will contact you soon.' })
})

app.use((error, _req, res, _next) => {
  if (error.message === 'Origin is not allowed') return res.status(403).json({ message: 'Request origin is not allowed.' })
  console.error(error)
  return res.status(500).json({ message: 'Unable to process this request.' })
})

app.listen(port, () => console.log(`SB Tech contact API listening on port ${port}`))
