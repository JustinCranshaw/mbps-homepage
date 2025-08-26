import defaultDividerImg from '../../assets/images/kabota_bridge.jpg'

interface ScenicDividerProps {
  src?: string
  alt?: string
}

const ScenicDivider = ({ src, alt }: ScenicDividerProps) => {
  return (
    <section className="scenic-divider">
      <div className="scenic-divider__image" role="img" aria-label={alt ?? 'Scenic photo divider'}>
        <img src={src ?? defaultDividerImg} alt={alt ?? 'Scenic photo divider'} />
        <div className="scenic-divider__overlay" />
      </div>
    </section>
  )
}

export default ScenicDivider


