const Footer = () => {
  return (
    <footer className="bg-old-growth text-morning-mist py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* School Info */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              Mount Baker Preschool
            </h3>
            <p className="text-rain-cloud mb-4">
              A Waldorf Cooperative
            </p>
            <div className="text-sm leading-relaxed space-y-2">
              <p>722 30th Avenue South</p>
              <p>Seattle, Washington 98144</p>
              <p>
                <a 
                  href="mailto:mountbakerpreschool@gmail.com"
                  className="text-salmon hover:text-salmon/80 transition-colors duration-200"
                >
                  mountbakerpreschool@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xl font-semibold mb-4">
              Community
            </h4>
            <p className="text-rain-cloud text-sm leading-relaxed mb-4">
              Join our Waldorf cooperative community where children learn through play, 
              creativity, and connection with nature.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-fern rounded-full flex items-center justify-center text-base">
                🌱
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-fern/30 text-center text-sm text-rain-cloud">
          <p className="mb-2">
            © {new Date().getFullYear()} Mount Baker Preschool. All rights reserved.
          </p>
          <p className="text-xs">
            Nurturing children through Waldorf education and cooperative community
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer