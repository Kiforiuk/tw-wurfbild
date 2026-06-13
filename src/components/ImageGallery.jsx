export default function ImageGallery() {
  return (
    <div className="w-full bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/image1.png"
              alt="Handball Analyse"
              className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition"
            />
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/image2.png"
              alt="Handball Statistik"
              className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
