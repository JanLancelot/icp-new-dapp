import { FooterComponent } from "@/components/footer";
import { VolunteerOpportunities } from "@/components/hero-banner-and-search";
import { NavbarComponent } from "@/components/navbar";

export default function () {
  return (
    <div>
      <NavbarComponent />
      <VolunteerOpportunities />
      <FooterComponent />
    </div>
  );
}
