export default function PartnerLogosComponent() {
  const imageLinks = [
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
    "https://banner2.cleanpng.com/20180504/wyw/avdkmqc2o.webp",
  ];

  return (
    <section className="w-full border-y border-gray-200 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            FIND OPPORTUNITIES BY EACH PARTNER
          </h2>
          <div className="h-1 w-16 bg-black mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {imageLinks.map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <img
                src={src}
                alt={`Partner logo ${i + 1}`}
                width={80}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}