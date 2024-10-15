import { CreateOrganizationProfile } from "@/components/create-organization-profile";
import Dashboard from "@/components/dashboard";

export default function EditOrgProfile() {
  return (
    <div>
      <Dashboard>
        <CreateOrganizationProfile />
      </Dashboard>
    </div>
  );
}
