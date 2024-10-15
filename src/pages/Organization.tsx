import { FooterComponent } from '@/components/footer'
import { NavbarComponent } from '@/components/navbar'
import { VolunteerMatchPage } from '@/components/volunteer-match-page'

export default function Organization() {
  return (
    <div>
        <NavbarComponent />
        <VolunteerMatchPage />
        <FooterComponent />
    </div>
  )
}
