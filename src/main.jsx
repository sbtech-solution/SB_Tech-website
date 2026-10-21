import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, BarChart3, Check, ChevronRight, Code2, Globe2, Layers3, LayoutDashboard,
  Mail, Menu, MessageCircle, MonitorSmartphone, Palette, Play, Rocket, Send, Settings2,
  Smartphone, Sparkles, Store, X, Zap,
} from 'lucide-react'
import './styles.css'

const phone = '916382379827'
const quote = 'Hello SB Tech Solution, I am interested in developing a website or mobile application for my business. Please share the details and pricing.'
const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(quote)}`
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'

const translations = {
  en: {
    nav: ['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'Contact'],
    heroEyebrow: 'Digital partners for ambitious businesses',
    heroTitle: 'We build digital experiences that move your business forward.',
    heroText: 'From modern websites to powerful mobile applications, we transform your ideas into reliable digital products.',
    quote: 'Get a free quote', explore: 'Explore our services', viewAll: 'View all services',
    trusted: 'The right technology, without the enterprise overhead.',
    servicesTitle: 'Everything you need to move forward.',
    servicesText: 'Focused digital services for small businesses, startups, shops and growing teams.',
    portfolioTitle: 'Selected work, thoughtfully built.',
    portfolioText: 'A few sample directions to show how we approach real business problems. Your project can be next.',
    whyTitle: 'Built around your business.',
    contactTitle: 'Let’s build what’s next.',
    contactText: 'Tell us where you are today and where you want to go. We’ll help map the simplest path forward.',
    phone: 'Call or WhatsApp',
  },
  ta: {
    nav: ['முகப்பு', 'எங்களைப் பற்றி', 'சேவைகள்', 'போர்ட்ஃபோலியோ', 'விலை', 'தொடர்பு'],
    heroEyebrow: 'வளரும் நிறுவனங்களுக்கான டிஜிட்டல் கூட்டாளிகள்',
    heroTitle: 'உங்கள் வணிகத்தை முன்னோக்கி நகர்த்தும் டிஜிட்டல் அனுபவங்களை உருவாக்குகிறோம்.',
    heroText: 'நவீன வலைத்தளங்கள் முதல் சக்திவாய்ந்த மொபைல் செயலிகள் வரை, உங்கள் யோசனைகளை நம்பகமான டிஜிட்டல் தயாரிப்புகளாக மாற்றுகிறோம்.',
    quote: 'இலவச மதிப்பீடு பெறுங்கள்', explore: 'சேவைகளைப் பாருங்கள்', viewAll: 'அனைத்து சேவைகளும்',
    trusted: 'பெரிய நிறுவனச் செலவுகள் இல்லாமல் சரியான தொழில்நுட்பம்.',
    servicesTitle: 'முன்னேற உங்களுக்குத் தேவையான அனைத்தும்.',
    servicesText: 'சிறு வணிகங்கள், ஸ்டார்ட்அப்கள் மற்றும் வளர்ந்து வரும் குழுக்களுக்கான டிஜிட்டல் சேவைகள்.',
    portfolioTitle: 'கவனமாக உருவாக்கப்பட்ட மாதிரி பணிகள்.',
    portfolioText: 'உண்மையான வணிகச் சிக்கல்களை நாங்கள் அணுகும் விதத்தை விளக்கும் மாதிரி திசைகள்.',
    whyTitle: 'உங்கள் வணிகத்தை மையமாகக் கொண்டு.',
    contactTitle: 'அடுத்ததை உருவாக்குவோம்.',
    contactText: 'இன்று நீங்கள் இருக்கும் இடத்தையும் செல்ல விரும்பும் இடத்தையும் சொல்லுங்கள்.',
    phone: 'அழைக்க அல்லது WhatsApp',
  },
}

const services = [
  { icon: Globe2, title: 'Website Development', ta: 'வலைத்தள உருவாக்கம்', desc: 'Fast, responsive websites that make your business look credible and ready for the next customer.', points: ['Responsive by default', 'SEO-ready foundation'] },
  { icon: Store, title: 'E-commerce Websites', ta: 'இ-காமர்ஸ் வலைத்தளம்', desc: 'Product-focused storefronts with smooth browsing and a clear path from discovery to purchase.', points: ['Catalog and checkout flows', 'Easy-to-manage structure'] },
  { icon: Smartphone, title: 'Android App Development', ta: 'Android செயலி உருவாக்கம்', desc: 'Useful Android apps for customers, teams and the everyday work that keeps business moving.', points: ['Starts at ₹7,000', 'Built around your requirements'] },
  { icon: Play, title: 'Play Store Publishing', ta: 'Play Store வெளியீடு', desc: 'We help package, prepare and publish your Android application on Google Play.', points: ['Listing setup guidance', 'Release support'] },
  { icon: Palette, title: 'UI/UX Design', ta: 'UI/UX வடிவமைப்பு', desc: 'Clear interfaces and thoughtful journeys that make complex products feel simple.', points: ['Wireframes to visual design', 'User-first decisions'] },
  { icon: LayoutDashboard, title: 'Business Management Systems', ta: 'வணிக மேலாண்மை அமைப்புகள்', desc: 'Custom tools that bring your operations, data and decisions into one place.', points: ['Workflow-focused', 'Role-aware experiences'] },
  { icon: Code2, title: 'Custom Software', ta: 'தனிப்பயன் மென்பொருள்', desc: 'Purpose-built software for processes that off-the-shelf tools cannot quite solve.', points: ['Scalable architecture', 'Practical integrations'] },
  { icon: Settings2, title: 'Maintenance & Support', ta: 'பராமரிப்பு மற்றும் ஆதரவு', desc: 'Ongoing care that keeps your site or product secure, current and dependable.', points: ['Updates and fixes', 'Reliable support'] },
]

const projects = [
  { kind: 'Concept / sample', title: 'Local commerce platform', desc: 'A considered storefront direction for a growing local retailer.', tags: ['React', 'E-commerce'], color: 'from-electric/30 to-violet/30' },
  { kind: 'Concept / sample', title: 'Operations dashboard', desc: 'A focused business management interface for clearer daily decisions.', tags: ['Product design', 'Dashboard'], color: 'from-violet/30 to-fuchsia-400/20' },
  { kind: 'Concept / sample', title: 'Customer companion app', desc: 'A mobile-first experience that keeps customers close to the business.', tags: ['Android', 'UX/UI'], color: 'from-cyan-400/20 to-electric/30' },
]

const motionEase = [0.22, 1, 0.36, 1]
const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: motionEase } },
}

function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return <Routes>
    <Route path="*" element={<Shell lang={lang} setLang={setLang} t={t} />} />
  </Routes>
}

function Shell({ lang, setLang, t }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const [open, setOpen] = useState(false)
  const navPaths = ['/', '/about', '/services', '/portfolio', '/pricing', '/contact']
  return <div className="min-h-screen overflow-hidden bg-ink text-white">
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="logo-mark">SB</span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">SB Tech <span className="text-slate">Solution</span></span>
        </Link>
        <nav className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-[74px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#0b192a] p-3 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
          {t.nav.map((label, i) => <NavLink key={label} to={navPaths[i]} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link rounded-lg px-3 py-2 text-sm transition ${isActive ? 'is-active text-white' : 'text-slate hover:text-white'}`}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} className="language-pill" aria-label="Switch language">{lang === 'en' ? 'தமிழ்' : 'EN'}</button>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="hidden rounded-full bg-electric px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white sm:block">{t.quote}</a>
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate md:hidden" aria-label="Toggle navigation">{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
    </header>
    <main><RoutesContent t={t} /></main>
    <Footer t={t} />
    <a href={whatsapp} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp"><MessageCircle size={25} fill="currentColor" /></a>
  </div>
}

function RoutesContent({ t }) {
  return <Routes>
    <Route path="/" element={<Home t={t} />} />
    <Route path="/about" element={<About t={t} />} />
    <Route path="/services" element={<ServicesPage t={t} />} />
    <Route path="/portfolio" element={<Portfolio t={t} />} />
    <Route path="/pricing" element={<Pricing t={t} />} />
    <Route path="/contact" element={<Contact t={t} />} />
    <Route path="/privacy-policy" element={<Legal title="Privacy Policy" />} />
    <Route path="/terms-and-conditions" element={<Legal title="Terms & Conditions" />} />
    <Route path="/privacy" element={<Legal title="Privacy Policy" />} />
    <Route path="/terms" element={<Legal title="Terms & Conditions" />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
}

function SectionIntro({ eyebrow, title, text, center = false }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <p className="eyebrow">{eyebrow}</p><h2 className="mt-4">{title}</h2>{text && <p className="mt-5 text-lg leading-8 text-slate">{text}</p>}
  </motion.div>
}

function Home({ t }) {
  return <>
    <section className="hero-shell">
      <div className="hero-grid" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-40 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-32 lg:pt-48">
        <div className="relative z-10">
          <motion.p variants={reveal} initial="hidden" animate="visible" className="eyebrow"><Sparkles size={15} /> {t.heroEyebrow}</motion.p>
          <motion.h1 variants={reveal} initial="hidden" animate="visible" transition={{ delay: .08 }} className="gradient-heading mt-6 max-w-3xl">{t.heroTitle}</motion.h1>
          <motion.p variants={reveal} initial="hidden" animate="visible" transition={{ delay: .16 }} className="mt-7 max-w-xl text-lg leading-8 text-slate">{t.heroText}</motion.p>
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{ delay: .24 }} className="mt-9 flex flex-wrap gap-4"><a href={whatsapp} target="_blank" rel="noreferrer" className="button-primary">{t.quote}<ArrowRight size={17} /></a><Link to="/services" className="button-secondary">{t.explore}</Link></motion.div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate"><span className="flex items-center gap-2"><Check size={16} className="text-electric" /> Mobile-first</span><span className="flex items-center gap-2"><Check size={16} className="text-electric" /> Transparent process</span><span className="flex items-center gap-2"><Check size={16} className="text-electric" /> Tamil + English</span></div>
        </div>
        <HeroVisual />
      </div>
    </section>
    <section className="border-y border-white/[.06] bg-white/[.02] py-7"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-5 text-sm text-slate lg:px-8"><span className="font-medium text-white">{t.trusted}</span><span className="tech-chip">React</span><span className="tech-chip">Node.js</span><span className="tech-chip">MySQL / MongoDB</span><span className="tech-chip">Vercel</span></div></section>
    <section className="section-pad"><SectionIntro eyebrow="What we do" title={t.servicesTitle} text={t.servicesText} /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.slice(0, 4).map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}</div><Link to="/services" className="link-arrow mt-9">{t.viewAll}<ArrowRight size={17} /></Link></section>
    <section className="section-pad border-t border-white/[.06] bg-[#091625]"><SectionIntro eyebrow="A glimpse of what’s possible" title={t.portfolioTitle} text={t.portfolioText} /><div className="grid gap-5 lg:grid-cols-3">{projects.map((p, i) => <ProjectCard project={p} key={p.title} index={i} />)}</div><Link to="/portfolio" className="link-arrow mt-9">Explore portfolio <ArrowRight size={17} /></Link></section>
    <Process />
    <Why />
    <ContactBanner t={t} />
  </>
}

function HeroVisual() {
  const reduceMotion = useReducedMotion()
  const float = reduceMotion ? {} : { y: [0, -10, 0] }
  const floatSlow = reduceMotion ? {} : { y: [0, 8, 0] }
  return <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .8, ease: motionEase }} className="hero-visual relative mx-auto h-[390px] w-full max-w-[520px]">
    <div className="ambient-orb orb-one" /><div className="ambient-orb orb-two" />
    <div className="dashboard-frame absolute inset-7 rounded-[2rem] border border-electric/20 bg-gradient-to-br from-electric/10 via-[#101f35] to-violet/10 shadow-glow" />
    <motion.div animate={float} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="floating-card absolute left-0 top-16 rounded-2xl border border-white/10 bg-[#0c1b2d]/90 p-4 shadow-2xl backdrop-blur"><BarChart3 className="text-electric" size={21} /><div className="mt-5 flex items-end gap-1.5"><i className="chart-bar h-8" /><i className="chart-bar h-14" /><i className="chart-bar h-11" /><i className="chart-bar h-20 bg-violet/80" /><i className="chart-bar h-24" /></div></motion.div>
    <div className="absolute right-0 top-8 rounded-2xl border border-white/10 bg-[#0c1b2d]/90 p-4 shadow-2xl backdrop-blur"><div className="flex items-center gap-2 text-xs text-slate"><span className="h-2 w-2 rounded-full bg-emerald-400" /> System online</div><div className="mt-3 text-2xl font-semibold">Built for clarity</div><div className="text-xs text-electric">purposeful digital products</div></div>
    <motion.div animate={floatSlow} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="floating-card absolute bottom-4 left-14 right-10 rounded-[1.5rem] border border-white/10 bg-[#0e2137]/95 p-5 shadow-2xl backdrop-blur"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-xs text-slate"><span className="logo-mark !h-6 !w-6 !text-[9px]">SB</span> Digital workspace</div><MoreDots /></div><div className="space-y-3"><div className="h-2 w-4/5 rounded bg-white/10" /><div className="h-2 w-3/5 rounded bg-white/10" /><div className="mt-5 h-12 rounded-xl bg-gradient-to-r from-electric/20 to-violet/20" /></div></motion.div>
  </motion.div>
}
function MoreDots() { return <div className="flex gap-1"><i className="h-1 w-1 rounded-full bg-slate" /><i className="h-1 w-1 rounded-full bg-slate" /><i className="h-1 w-1 rounded-full bg-slate" /></div> }

function ServiceCard({ service: S, index }) {
  return <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} className="card group"><div className="icon-box"><S.icon size={22} /></div><h3 className="mt-6 text-xl">{S.title}</h3><p className="mt-3 text-sm leading-6 text-slate">{S.desc}</p><ul className="mt-5 space-y-2 text-xs text-slate">{S.points.map(p => <li key={p} className="flex items-center gap-2"><Check size={13} className="text-electric" />{p}</li>)}</ul><Link to={`/contact?service=${encodeURIComponent(S.title)}`} className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-white opacity-70 transition group-hover:opacity-100">Request a quote <ChevronRight size={15} /></Link></motion.div>
}
function ProjectCard({ project: p, index }) {
  return <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="project-card"><div className={`project-art bg-gradient-to-br ${p.color}`}><div className="absolute inset-6 rounded-lg border border-white/20 bg-ink/70 p-4"><div className="flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-red-300/70" /><i className="h-1.5 w-1.5 rounded-full bg-yellow-300/70" /><i className="h-1.5 w-1.5 rounded-full bg-green-300/70" /></div><div className="mt-6 grid grid-cols-3 gap-2"><div className="col-span-2 h-3 rounded bg-white/20" /><div className="h-3 rounded bg-electric/50" /><div className="col-span-3 mt-4 h-16 rounded bg-white/10" /></div></div></div><p className="mt-5 text-xs uppercase tracking-[.16em] text-electric">{p.kind}</p><h3 className="mt-2 text-xl">{p.title}</h3><p className="mt-2 text-sm leading-6 text-slate">{p.desc}</p><div className="mt-4 flex gap-2">{p.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></motion.div>
}

function Why() { const items = [['01', 'Affordable development', 'Smart scope, thoughtful execution and no unnecessary complexity.'], ['02', 'Business-focused', 'Every screen and feature should make work clearer or growth easier.'], ['03', 'Clear communication', 'Straight answers, visible progress and a process you can trust.'], ['04', 'Reliable support', 'We build relationships beyond the first launch.']]; return <section className="section-pad"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="Why SB Tech" title="Technology that feels like a partnership." text="You bring the ambition. We bring the design thinking, engineering and practical care to turn it into something people can use." /><div className="grid gap-3 sm:grid-cols-2">{items.map(([n, title, text]) => <div className="border-t border-white/10 py-5" key={n}><span className="text-sm text-electric">{n}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6 text-slate">{text}</p></div>)}</div></div></section> }
function Process() { const steps = [['01', 'Discover', 'Understand your goals, audience and constraints.'], ['02', 'Design', 'Shape a clear experience before we build it.'], ['03', 'Develop', 'Turn the approved direction into dependable software.'], ['04', 'Launch', 'Prepare, test and release your product with care.'], ['05', 'Support', 'Keep improving with practical ongoing support.']]; return <section className="section-pad border-t border-white/[.06] bg-[#091625]"><SectionIntro eyebrow="How we work" title="A simple process, built for momentum." text="You always know what happens next, why it matters and what we need from you." /><div className="grid gap-3 md:grid-cols-5">{steps.map(([number, title, text]) => <div className="border-t border-electric/30 pt-5" key={number}><span className="text-xs text-electric">{number}</span><h3 className="mt-4 text-lg">{title}</h3><p className="mt-2 text-sm leading-6 text-slate">{text}</p></div>)}</div></section> }

function ContactBanner({ t }) { return <section className="section-pad pt-4"><div className="relative overflow-hidden rounded-3xl border border-electric/20 bg-gradient-to-br from-electric/10 via-[#0c1c30] to-violet/10 p-8 sm:p-12"><div className="relative z-10 max-w-xl"><p className="eyebrow">Start a conversation</p><h2 className="mt-4">{t.contactTitle}</h2><p className="mt-5 text-lg leading-8 text-slate">{t.contactText}</p><Link to="/contact" className="button-primary mt-8">Tell us about your project <ArrowRight size={17} /></Link></div><Zap className="absolute -bottom-10 -right-5 h-64 w-64 text-electric/10" /></div></section> }

function PageHeader({ eyebrow, title, text }) { return <section className="page-header"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-3xl">{title}</h1>{text && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">{text}</p>}</div></section> }
function About({ t }) { return <><PageHeader eyebrow="About SB Tech Solution" title="Good technology should make business feel lighter." text="SB Tech Solution is a technology and digital solutions brand helping businesses across Tamil Nadu and India take their next step with confidence." /><section className="section-pad"><div className="grid gap-14 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow">Our mission</p><h2 className="mt-4">Make digital progress accessible.</h2><p className="mt-5 text-lg leading-8 text-slate">We believe a great digital product is not reserved for large companies. Our mission is to help small businesses, entrepreneurs and growing teams use technology to serve better, work smarter and move forward.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="link-arrow mt-8">Talk to us <ArrowRight size={17} /></a></div><div className="grid gap-3 sm:grid-cols-2">{[['Quality', 'Careful work that holds up in the real world.'], ['Innovation', 'Useful new ideas, not novelty for its own sake.'], ['Affordability', 'Honest scope and solutions that respect your budget.'], ['Satisfaction', 'Your confidence matters at every step.']].map(([title, text]) => <div className="card" key={title}><Sparkles size={20} className="text-electric" /><h3 className="mt-6 text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-slate">{text}</p></div>)}</div></div></section><ContactBanner t={t} /></> }
function ServicesPage({ t }) { return <><PageHeader eyebrow="Services" title="Digital services for the work you want to do next." text="Choose a starting point or combine services into a solution shaped around your business." /><section className="section-pad"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}</div></section><ContactBanner t={t} /></> }
function Portfolio({ t }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'E-commerce', 'Dashboard', 'Android']
  const visible = filter === 'All' ? projects : projects.filter((project) => project.tags.includes(filter))
  return <><PageHeader eyebrow="Portfolio" title="A sample of the thinking we bring to every build." text="These are clearly labeled concept directions, not claimed client work. We keep our portfolio honest—and make it easy for your project to become the next real story." /><section className="section-pad"><div className="mb-10 flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`filter-button ${filter === item ? 'is-selected' : ''}`}>{item}</button>)}</div><motion.div layout className="grid gap-6 lg:grid-cols-3"><AnimatePresence mode="popLayout">{visible.map((p, i) => <ProjectCard project={p} key={p.title} index={i} />)}</AnimatePresence></motion.div></section><ContactBanner t={t} /></>
}
function Pricing({ t }) { return <><PageHeader eyebrow="Pricing" title="A clear starting point. A quote built around reality." text="Projects vary with features, integrations and the level of support you need. We do not hide behind arbitrary packages." /><section className="section-pad"><div className="grid gap-5 lg:grid-cols-3"><PriceCard icon={Globe2} title="Website projects" text="A focused digital home for your business." /><PriceCard icon={Smartphone} title="Android apps" text="Useful mobile experiences for customers or teams." price="Starts at ₹7,000" featured /><PriceCard icon={LayoutDashboard} title="Business systems" text="Tools designed around the way you work." /></div><p className="mt-8 text-center text-sm text-slate">Mobile app pricing starts at ₹7,000 and is subject to project features and requirements. Other services are quoted after understanding your scope.</p></section><ContactBanner t={t} /></> }
function PriceCard({ icon: Icon, title, text, price = 'Request a quote', featured }) { return <div className={`card relative ${featured ? 'border-electric/50 shadow-glow' : ''}`}>{featured && <span className="absolute right-5 top-5 rounded-full bg-electric/15 px-3 py-1 text-xs text-electric">Popular starting point</span>}<div className="icon-box"><Icon size={22} /></div><h3 className="mt-7 text-2xl">{title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-slate">{text}</p><div className="mt-8 border-t border-white/10 pt-6 text-xl font-semibold">{price}</div><Link to="/contact" className="button-secondary mt-7 w-full">Discuss your project <ArrowRight size={15} /></Link></div> }
function Contact({ t }) { return <><PageHeader eyebrow="Contact" title={t.contactTitle} text={t.contactText} /><section className="section-pad"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><div className="space-y-6"><a href={`tel:+${phone}`} className="contact-item"><Smartphone /><span><small>{t.phone}</small><strong>+91 63823 79827</strong></span></a><a href={whatsapp} target="_blank" rel="noreferrer" className="contact-item"><MessageCircle /><span><small>WhatsApp</small><strong>Chat with SB Tech</strong></span></a><div className="contact-item opacity-70"><Mail /><span><small>Email</small><strong>Configured when available</strong></span></div></div><p className="mt-10 max-w-sm text-sm leading-6 text-slate">Email and business address remain configurable until confirmed. For the fastest response, use WhatsApp.</p></div><ContactForm /></div></section></> }
function ContactForm() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const selectedService = params.get('service') || ''
  async function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next = {}
    if (!data.get('name')) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.get('email'))) next.email = 'Please enter a valid email.'
    if (String(data.get('description') || '').trim().length < 10) next.description = 'Tell us a little about your project.'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    setStatus('')
    try {
      const response = await fetch(`${apiUrl}/api/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data)) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to submit your enquiry.')
      setStatus(result.message)
      e.currentTarget.reset()
    } catch (error) {
      setStatus(error.message)
    } finally { setLoading(false) }
  }
  return <form onSubmit={submit} className="form-card" noValidate><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" error={errors.name} /><Field label="Email" name="email" type="email" error={errors.email} /><Field label="Phone" name="phone" /><label className="field"><span>Service</span><select name="service" defaultValue={selectedService}><option value="">Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}</select></label><label className="field sm:col-span-2"><span>Budget range (optional)</span><select name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>Below ₹25,000</option><option>₹25,000 – ₹75,000</option><option>Above ₹75,000</option></select></label></div><label className="field mt-5"><span>Project description</span><textarea name="description" rows="5" placeholder="What would you like to build?" /></label>{errors.description && <p className="mt-2 text-sm text-red-300">{errors.description}</p>}{status && <p className="mt-5 rounded-xl border border-electric/20 bg-electric/10 p-4 text-sm leading-6 text-electric" role="status">{status}</p>}<button className="button-primary mt-6" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send enquiry'} {!loading && <Send size={16} />}</button></form>
}
function Field({ label, name, type = 'text', error }) { return <label className="field"><span>{label}</span><input name={name} type={type} />{error && <small className="text-red-300">{error}</small>}</label> }
function Legal({ title }) {
  const privacy = title === 'Privacy Policy'
  return <><PageHeader eyebrow="Information" title={title} text="This document is a practical starting point and should be reviewed with your legal advisor before publication." /><section className="section-pad"><div className="prose-like">
    {privacy ? <><h2>Information we collect</h2><p>When you contact SB Tech Solution, we may collect your name, email address, phone number, selected service, budget range and project description. Please do not submit passwords, payment details or other sensitive information through this website.</p><h3>How we use enquiries</h3><p>We use enquiry information to understand your requirements, respond to your request and prepare a possible proposal. We do not sell enquiry data. WhatsApp conversations are also subject to WhatsApp’s own policies.</p><h3>Retention and deletion</h3><p>We retain enquiry information only for as long as reasonably needed to communicate about the project, provide support or meet legitimate business requirements. You may request correction or deletion by contacting us through WhatsApp.</p><h3>Security and third parties</h3><p>We use reasonable technical safeguards and limit access to enquiry information. The website may use hosting, analytics or communication providers when configured. Their details should be added here before launch.</p></> : <><h2>Scope and quotations</h2><p>Each project scope, deliverable, timeline and quotation should be agreed in writing before work begins. Final pricing depends on features, integrations, design, content and delivery requirements.</p><h3>Client responsibilities and changes</h3><p>Clients are responsible for timely information, approvals and access required for delivery. New features or changes outside the agreed scope may affect timeline and cost and should be approved before implementation.</p><h3>Intellectual property and third-party costs</h3><p>Ownership and source-code handover terms should be specified in the project quotation. Hosting, domains, app-store fees, paid APIs and other third-party costs are separate unless explicitly included.</p><h3>Support, cancellation and refunds</h3><p>Maintenance, cancellation and refund terms are project-specific placeholders until confirmed in writing. Nothing on this page is intended to create a guarantee of results or replace a signed agreement.</p></>}
    <h3>Contact</h3><p>For questions about this document, use the contact page or WhatsApp button on this website. Business email and address details will be added once confirmed.</p>
  </div></section></>
}
function NotFound() { return <section className="page-header min-h-[70vh]"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="eyebrow">404 / Not found</p><h1 className="mt-5">This page took a different route.</h1><p className="mt-6 max-w-lg text-lg leading-8 text-slate">The page you’re looking for does not exist or has moved.</p><Link to="/" className="button-primary mt-8">Back to home <ArrowRight size={17} /></Link></div></section> }
function Footer({ t }) { return <footer className="border-t border-white/[.07]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><Link to="/" className="flex items-center gap-3"><span className="logo-mark">SB</span><span className="text-sm font-semibold">SB Tech <span className="text-slate">Solution</span></span></Link><p className="mt-5 max-w-xs text-sm leading-6 text-slate">Your Business. Our Technology.<br />Digital solutions built for your next step.</p></div><div><p className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-slate">Explore</p><div className="grid gap-3 text-sm text-slate">{['About', 'Services', 'Portfolio', 'Pricing'].map(x => <Link className="transition hover:text-white" key={x} to={`/${x.toLowerCase()}`}>{x}</Link>)}</div></div><div><p className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-slate">Start here</p><a href={whatsapp} target="_blank" rel="noreferrer" className="text-sm text-electric hover:text-white">WhatsApp +91 63823 79827</a><div className="mt-4 flex gap-4 text-sm text-slate"><Link to="/privacy-policy" className="hover:text-white">Privacy</Link><Link to="/terms-and-conditions" className="hover:text-white">Terms</Link></div></div></div><div className="mx-auto max-w-7xl border-t border-white/[.07] px-5 py-5 text-xs text-slate lg:px-8">© {new Date().getFullYear()} SB Tech Solution. Built with purpose.</div></footer> }

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
