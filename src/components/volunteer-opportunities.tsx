'use client'

import { Calendar, Globe, Lightbulb, Laptop, Tent, Leaf } from 'lucide-react'

export function VolunteerOpportunitiesComponent() {
  const opportunities = [
    { title: 'Volunteer Virtually', icon: Laptop, bgImage: 'https://skillsforchange.com/wp-content/uploads/2021/04/What-is-Online-Volunteering.jpeg' },
    { title: 'Educate and Engage Others', icon: Lightbulb, bgImage: 'https://rs.projects-abroad.org/v1/hero/product-5c6be6e3095c2.[1600].jpeg' },
    { title: 'Support Climate Solutions', icon: Globe, bgImage: 'https://www.greenpeace.org/static/planet4-philippines-stateless/2019/05/4ea8cc42-18278214_10211556874331254_5212795212765759391_o.jpg' },
    { title: 'One Day Events', icon: Calendar, bgImage: 'https://journal.com.ph/wp-content/uploads/2023/07/Cleanup-1-1200x800.jpg' },
    { title: 'Lodging Offered', icon: Tent, bgImage: 'https://www.dynatrap.com/media/wysiwyg/Articles/DynaTrap/DT_setting-up-your-campsite-to-avoid-mosquitoes.jpg' },
    { title: 'Care for our Natural Resources', icon: Leaf, bgImage: 'https://goharibon.wordpress.com/wp-content/uploads/2015/08/gedc0285.jpg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Find The Right Fit</h1>
      <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
        Volunteer opportunities come in all shapes and sizes. Use these filtered searches to find the right fit.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg ${
              index === 4 || index === 5 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
            style={{
              backgroundImage: `url(${opportunity.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
              <opportunity.icon className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-center">{opportunity.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}