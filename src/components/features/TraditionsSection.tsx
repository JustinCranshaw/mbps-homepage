import { useState } from 'react'
import Section from '../ui/Section'
import imgPumpkin from '../../assets/images/traditions/pumkin.jpg'
import imgTrinket from '../../assets/images/traditions/trinket.jpg'
import imgLanterns from '../../assets/images/traditions/lanterns.jpg'
import imgSpiral from '../../assets/images/traditions/spiral.jpg'
import imgDollDay from '../../assets/images/traditions/doll_day.JPG'
import imgKiteDay from '../../assets/images/traditions/kite_day.jpg'
import imgGraduation from '../../assets/images/traditions/graduation.jpg'
import imgMaypole from '../../assets/images/traditions/maypole.jpg'
import imgKubota from '../../assets/images/traditions/kubota.jpg'

type Tradition = {
  id: string
  name: string
  month: string
  emoji?: string
  description: string
  image: string
}

const TRADITIONS: Tradition[] = [
  {
    id: 'pumpkin',
    name: 'Pumpkin Patch Visit',
    month: 'October',
    emoji: '🎃',
    description: `A joyful autumn outing where children select pumpkins and experience the harvest season. Together we explore the farm and connect with the earth's rhythms.`,
    image: imgPumpkin,
  },
  {
    id: 'halloween',
    name: 'Bradner Gardens Trinket Treat',
    month: 'October',
    emoji: '👻',
    description: `Our gentle alternative to trick-or-treating, where children discover small treasures hidden throughout the community gardens. This magical hunt celebrates autumn while fostering wonder in nature's spaces.`,
    image: imgTrinket,
  },
  {
    id: 'lantern',
    name: 'Lantern Walk',
    month: 'November',
    emoji: '🏮',
    description: `As darkness grows, we carry handmade lanterns through the evening, bringing light into the world together. Children experience their inner light shining outward in this moving celebration of community.`,
    image: imgLanterns,
  },
  {
    id: 'spiral',
    name: 'Winter Spiral',
    month: 'December',
    emoji: '🕯️',
    description: `A ceremony filled with mystery and wonder, where each child walks alone to light a candle at the spiral's center. This contemplative tradition marks the winter solstice, honoring the return of light at the year's darkest moment.`,
    image: imgSpiral,
  },
  {
    id: 'doll',
    name: 'Doll Day',
    month: 'March',
    emoji: '🧸',
    description: `Children bring beloved dolls and stuffed animals for a special day of nurturing play. Through caring for their special friends, children practice empathy and gentle caregiving.`,
    image: imgDollDay,
  },
  {
    id: 'maypole',
    name: 'May Pole',
    month: 'May',
    emoji: '🌸',
    description: `We welcome spring with ribbons, flowers, and joyful dancing around the traditional May Pole. Children weave together in celebration, creating beautiful patterns that mirror nature's awakening.`,
    image: imgMaypole,
  },
  {
    id: 'kubota',
    name: 'Kubota Gardens Visit',
    month: 'May',
    emoji: '🌿',
    description: `An exploration of Seattle's stunning Japanese garden, where children cross bridges and discover waterfalls. This peaceful journey deepens our connection to nature and our local community.`,
    image: imgKubota,
  },
  {
    id: 'kite',
    name: 'Kite Day',
    month: 'May',
    emoji: '🪁',
    description: `Children launch handmade kites into spring breezes, watching their creations dance between earth and sky. A celebration of accomplishment as we send our hopes soaring.`,
    image: imgKiteDay,
  },
  {
    id: 'grad',
    name: 'Graduation',
    month: 'June',
    emoji: '🎓',
    description: `A joyous celebration marking the year's end for all our students, with special recognition for those embarking on new adventures. Together we honor each child's growth and the community bonds we've built throughout the year.`,
    image: imgGraduation,
  },
]

const TraditionsSection = () => {
  const [activeId, setActiveId] = useState<string>('spiral')
  const active = TRADITIONS.find(t => t.id === activeId) ?? TRADITIONS[0]

  return (
    <Section id="traditions" variant="forest">
      <div className="section-header text-center">
        <h2 className="section-title">Our Cherished Traditions</h2>
        <p className="section-lede max-w-3xl mx-auto">
          Throughout the year, we celebrate the changing seasons with meaningful traditions that connect our
          children to natural rhythms and community bonds.
        </p>
      </div>

      {/* Master–detail layout */}
      <div className="about-two-col traditions-panel">
        {/* Master list */}
        <div>
          {/* Mobile dropdown */}
          <div className="traditions-dropdown">
            <label htmlFor="tradition-select" className="sr-only">Choose a tradition</label>
            <select
              id="tradition-select"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-old-growth"
              value={activeId}
              onChange={(e) => setActiveId(e.target.value)}
            >
              {TRADITIONS.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.month})</option>
              ))}
            </select>
          </div>

          <ul className="traditions-list">
            {TRADITIONS.map(t => {
              const isActive = t.id === activeId
              return (
                <li key={t.id}>
                  <button
                    className={`traditions-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveId(t.id)}
                  >
                    <span className="traditions-item__icon" aria-hidden>{t.emoji}</span>
                    <span className="traditions-item__name">{t.name}</span>
                    <span className="month-chip">{t.month}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Detail panel - image with text overlay */}
        <div className="traditions-detail">
          <div className="traditions-media">
            <img src={active.image} alt={`${active.name} illustrative photograph`} />
            <div className="traditions-overlay">
              <div className="traditions-detail__header">
                <h3 className="display-text text-2xl m-0 traditions-overlay__title">{active.name}</h3>
              </div>
              <p className="body-text traditions-overlay__body">{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default TraditionsSection


