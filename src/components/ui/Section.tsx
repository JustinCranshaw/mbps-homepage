import { type ReactNode } from 'react'

type SectionVariant = 'mist' | 'forest' | 'default'
type ElevationType = 'above' | 'below' | 'both' | 'none'

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  /** Visual background variant */
  variant?: SectionVariant
  /** Add subtle clean gradient at the top edge to blend with previous block */
  cleanTop?: boolean
  /** Center header/content; utility for quick alignment changes */
  centered?: boolean
  /** Optional id to enable hash-linking to this section */
  id?: string
  /** Add 3D depth effect - 'above' floats over preceding, 'below' over subsequent, 'both' over both */
  elevation?: ElevationType
}

const Section = ({
  children,
  className = '',
  containerClassName = '',
  variant = 'default',
  cleanTop = false,
  centered = false,
  elevation = 'none',
  id,
}: SectionProps) => {
  const variantClass =
    variant === 'mist'
      ? 'section-mist'
      : variant === 'forest'
      ? 'section-forest'
      : ''

  const cleanTopClass = cleanTop ? 'section-clean-top' : ''
  const centeredClass = centered ? 'text-center' : ''
  
  const elevationClass = 
    elevation === 'above' 
      ? 'section-elevated-above'
      : elevation === 'below'
      ? 'section-elevated-below' 
      : elevation === 'both'
      ? 'section-elevated'
      : ''

  return (
    <section id={id} className={[
      'section',
      variantClass,
      cleanTopClass,
      elevationClass,
      className
    ].filter(Boolean).join(' ')}>
      <div className={[
        'container',
        centeredClass,
        containerClassName
      ].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  )
}

export default Section


