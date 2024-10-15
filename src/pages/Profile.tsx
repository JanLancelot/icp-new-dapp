import { FooterComponent } from '@/components/footer'
import { NavbarComponent } from '@/components/navbar'
import VolunteerDashboard from '@/components/volunteer-dashboard'

export default function Profile() {
  return (
    <div>
        <NavbarComponent />
        <VolunteerDashboard />
        <FooterComponent />
    </div>
  )
}
