import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: ProPlomberie,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

const services = [
  {
    icon: '🚨',
    title: 'Dépannage d\'urgence',
    description: 'Intervention rapide 24h/24 et 7j/7 pour toutes vos urgences plomberie.',
  },
  {
    icon: '🚿',
    title: 'Installation sanitaire',
    description: 'Pose et installation de tous vos équipements sanitaires : WC, lavabo, douche, baignoire.',
  },
  {
    icon: '💧',
    title: 'Réparation de fuites',
    description: 'Détection et réparation de fuites d\'eau, joints, robinetterie et canalisations.',
  },
  {
    icon: '🔩',
    title: 'Débouchage canalisations',
    description: 'Débouchage professionnel de vos canalisations, éviers, douches et toilettes.',
  },
  {
    icon: '🔥',
    title: 'Chauffe-eau & chaudière',
    description: 'Installation, entretien et dépannage de chauffe-eau et chaudières toutes marques.',
  },
  {
    icon: '🏠',
    title: 'Rénovation salle de bain',
    description: 'Rénovation complète de votre salle de bain : conception, travaux, finitions.',
  },
]

const trustBadges = [
  { icon: '⚡', title: 'Intervention rapide', description: 'Présence sur site en moins d\'1 heure pour les urgences.' },
  { icon: '📋', title: 'Devis gratuit', description: 'Estimation gratuite et sans engagement pour tous vos travaux.' },
  { icon: '🏅', title: 'Artisan certifié', description: 'Qualibat RGE, assurance décennale, garantie de qualité.' },
  { icon: '✅', title: 'Garantie travaux', description: 'Tous nos travaux sont garantis pour votre tranquillité d\'esprit.' },
]

const testimonials = [
  {
    name: 'Marie Dupont',
    location: 'Paris 15e',
    rating: 5,
    text: 'Intervention très rapide suite à une fuite importante. Le plombier est arrivé en 45 minutes et a résolu le problème efficacement. Je recommande vivement !',
  },
  {
    name: 'Jean-Pierre Martin',
    location: 'Paris 8e',
    rating: 5,
    text: 'Excellente prestation pour l\'installation de ma nouvelle salle de bain. Travail soigné, propre et dans les délais. Tarifs très corrects.',
  },
  {
    name: 'Sophie Laurent',
    location: 'Boulogne-Billancourt',
    rating: 5,
    text: 'Chauffe-eau tombé en panne un dimanche soir, Francilienne du dépannage est intervenu rapidement. Sérieux, professionnel et honnête sur le devis.',
  },
]

const serviceTypes = [
  'Dépannage d\'urgence',
  'Installation sanitaire',
  'Réparation de fuites',
  'Débouchage canalisations',
  'Chauffe-eau & chaudière',
  'Rénovation salle de bain',
  'Autre',
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  )
}

function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFields({ ...fields, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...fields }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Demande envoyée !</h3>
        <p className="text-gray-600">Nous vous recontacterons dans les plus brefs délais.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot */}
      <div className="hidden">
        <input name="bot-field" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            required
            placeholder="06 XX XX XX XX"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          required
          placeholder="jean@exemple.fr"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Type de service
        </label>
        <select
          name="service"
          value={fields.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Sélectionnez un service...</option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Décrivez votre problème ou votre projet..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}

function ProPlomberie() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── HEADER ── */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo-francilienne.jpg" alt="Francilienne du dépannage" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <span className="text-xl font-extrabold text-blue-800">Francilienne</span>
                <span className="text-xl font-extrabold text-blue-500"> du dépannage</span>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <button onClick={() => scrollTo('services')} className="hover:text-blue-600 transition-colors">Services</button>
              <button onClick={() => scrollTo('pourquoi')} className="hover:text-blue-600 transition-colors">Pourquoi nous</button>
              <button onClick={() => scrollTo('avis')} className="hover:text-blue-600 transition-colors">Avis clients</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-blue-600 transition-colors">Contact</button>
            </nav>

            {/* Phone + CTA */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+33602783246"
                className="hidden sm:flex items-center gap-2 text-blue-700 font-bold hover:text-blue-900 transition-colors"
              >
                <span className="text-xl">📞</span>
                <span>06.02.78.32.46</span>
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Devis gratuit
              </button>
              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="w-5 h-0.5 bg-current mb-1"></div>
                <div className="w-5 h-0.5 bg-current mb-1"></div>
                <div className="w-5 h-0.5 bg-current"></div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
              <a href="tel:+33602783246" className="flex items-center gap-2 text-blue-700 font-bold px-2">
                <span>📞</span> 06.02.78.32.46
              </a>
              {['services', 'pourquoi', 'avis', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left px-2 py-1 text-gray-700 hover:text-blue-600 capitalize"
                >
                  {id === 'pourquoi' ? 'Pourquoi nous' : id === 'avis' ? 'Avis clients' : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[600px] md:min-h-[700px] flex items-center"
        style={{
          backgroundImage: 'url(/hero-plomberie.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-blue-950/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 text-blue-100 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span>⚡</span> Disponible 24h/24 – 7j/7
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Votre Expert Plombier<br />
              <span className="text-blue-300">Disponible 24h/24</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Dépannage d'urgence, installation, rénovation — nos artisans certifiés interviennent rapidement chez vous en Île-de-France. Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
              >
                Demander un Devis Gratuit
              </button>
              <a
                href="tel:+33602783246"
                className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>📞</span> 06.02.78.32.46
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
              Nos Services de Plomberie
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Une gamme complète de prestations plomberie réalisées par des artisans qualifiés, du dépannage d'urgence à la rénovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md border border-gray-100 transition-shadow group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="pourquoi" className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Pourquoi Choisir Francilienne du dépannage ?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Des professionnels de confiance à votre service pour tous vos travaux de plomberie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-3">{badge.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="avis" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
              Avis de Nos Clients
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Plus de 500 clients satisfaits nous font confiance en Île-de-France.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRating count={5} />
              <span className="text-gray-600 font-semibold">4.9/5 – 523 avis</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <StarRating count={t.rating} />
                <p className="text-gray-600 mt-4 mb-6 leading-relaxed italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-blue-900">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / QUOTE FORM ── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
                Demandez Votre Devis Gratuit
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Remplissez le formulaire et nous vous recontactons rapidement pour évaluer vos besoins et vous proposer un devis sans engagement.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">Téléphone</div>
                    <a href="tel:+33602783246" className="text-blue-600 hover:underline text-lg font-semibold">
                      06.02.78.32.46
                    </a>
                    <div className="text-sm text-gray-400">Urgences : 24h/24, 7j/7</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">Email</div>
                    <a href="mailto:franciliennedudepannage@gmail.com" className="text-blue-600 hover:underline">
                      franciliennedudepannage@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">Zone d'intervention</div>
                    <div className="text-gray-500">Paris et Île-de-France</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-blue-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-francilienne.jpg" alt="Francilienne du dépannage" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-xl font-extrabold">Francilienne du dépannage</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Votre expert plombier de confiance en Île-de-France. Artisan certifié, assurance décennale.
              </p>
              <a
                href="tel:+33602783246"
                className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold transition-colors"
              >
                📞 06.02.78.32.46
              </a>
            </div>

            {/* Services links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Nos Services</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                {services.map((s) => (
                  <li key={s.title}>
                    <span className="hover:text-white cursor-default transition-colors">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours & contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Horaires</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex justify-between"><span>Urgences</span><span className="text-green-400 font-semibold">24h/7j</span></li>
                <li className="flex justify-between"><span>Lun – Ven</span><span>8h00 – 20h00</span></li>
                <li className="flex justify-between"><span>Samedi</span><span>9h00 – 18h00</span></li>
                <li className="flex justify-between"><span>Dimanche</span><span>Urgences uniquement</span></li>
              </ul>
              <div className="mt-6 text-sm text-blue-200 space-y-1">
                <div>✉️ franciliennedudepannage@gmail.com</div>
                <div>📍 Paris & Île-de-France</div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
            <span>© {new Date().getFullYear()} Francilienne du dépannage. Tous droits réservés.</span>
            <span>Artisan certifié Qualibat – RGE – Assurance décennale</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
