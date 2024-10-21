import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Dog,
  Palette,
  Users,
  GraduationCap,
  Home,
  Laptop,
  Headphones,
  Siren,
  BookOpen,
  ShieldAlert,
  Briefcase,
  Leaf,
  Church,
  Stethoscope,
  Building,
  UtensilsCrossed,
  Plane,
  Globe,
  Scale,
  HeartHandshake,
  Radio,
  Accessibility,
  Vote,
  Users as UsersIcon,
  UserPlus,
  Trophy,
  Medal,
  User,
} from "lucide-react";

export function CreateOrganizationProfile() {
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    phone: "",
    category: "",
    hideMap: false,
    linkedin: "",
    facebook: "",
    twitter: "",
    photoUrl: "",
    mission: "",
    description: "",
  });

  const causes = [
    { name: "Advocacy & Human Rights", icon: Heart },
    { name: "Animals", icon: Dog },
    { name: "Arts & Culture", icon: Palette },
    { name: "Board Development", icon: Users },
    { name: "Children & Youth", icon: GraduationCap },
    { name: "Community", icon: Home },
    { name: "Computers & Technology", icon: Laptop },
    { name: "Crisis Support", icon: Headphones },
    { name: "Disaster Relief", icon: Siren },
    { name: "Education & Literacy", icon: BookOpen },
    { name: "Emergency & Safety", icon: ShieldAlert },
    { name: "Employment", icon: Briefcase },
    { name: "Environment", icon: Leaf },
    { name: "Faith-Based", icon: Church },
    { name: "Health & Medicine", icon: Stethoscope },
    { name: "Homeless & Housing", icon: Building },
    { name: "Hunger", icon: UtensilsCrossed },
    { name: "Immigrants & Refugees", icon: Plane },
    { name: "International", icon: Globe },
    { name: "Justice & Legal", icon: Scale },
    { name: "LGBTQ+", icon: HeartHandshake },
    { name: "Media & Broadcasting", icon: Radio },
    { name: "People with Disabilities", icon: Accessibility },
    { name: "Politics", icon: Vote },
    { name: "Race & Ethnicity", icon: UsersIcon },
    { name: "Seniors", icon: UserPlus },
    { name: "Sports & Recreation", icon: Trophy },
    { name: "Veterans & Military Families", icon: Medal },
    { name: "Women", icon: User },
  ];

  const handleCauseSelection = (cause: string) => {
    setSelectedCauses((prev) =>
      prev.includes(cause)
        ? prev.filter((c) => c !== cause)
        : prev.length < 5
        ? [...prev, cause]
        : prev
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/organizations/create", {
        ...formData,
        causes: selectedCauses,
      });
      console.log("Organization created:", response.data);
      // Handle success (e.g., show a success message, redirect to a new page)
    } catch (error) {
      console.error("Error creating organization:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto py-6">
        <div className="bg-blue-600 text-white p-8 relative overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          <h1 className="text-4xl font-bold relative z-10">
            Create Organization Profile
          </h1>
        </div>
        <div className="px-4 mb-6">
          <p className="text-sm text-gray-600">
            Recruit Volunteers &gt; Create Organization Profile
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create your organization profile</CardTitle>
            <CardDescription>
              Let volunteers know more about your organization's mission and
              primary cause areas to help them connect with you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Organization Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your organization's name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://www.example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1 *</Label>
                    <Input
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region/Province *</Label>
                    <Input
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="Enter your region or province"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter your postal code"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("country", value)
                      }
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Organization Category *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select your organization category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="501c-nonprofits">
                          501(c) Nonprofits
                        </SelectItem>
                        <SelectItem value="govt-hospice-state">
                          Gov't, Hospice, State-Level
                        </SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="religious">
                          Religious Organization
                        </SelectItem>
                        <SelectItem value="community-org">
                          Community Organization
                        </SelectItem>
                        <SelectItem value="social-enterprise">
                          Social Enterprise
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hideMap"
                    checked={formData.hideMap}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        hideMap: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="hideMap">
                    Don't show my organization on Google maps
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Social Media and Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://www.linkedin.com/company/example"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="https://www.facebook.com/example"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/example"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Organization Photo or Logo</Label>
                  <Input
                    id="photoUrl"
                    name="photoUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-500">
                    A good photo helps distinguish your nonprofit and generates
                    more potential volunteers
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Mission and Description
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement *</Label>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    placeholder="Tell potential volunteers the aims and values of your organization"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Organization Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell potential volunteers about your history, goals, programs, and achievements"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cause Areas</h3>
                <p className="text-sm text-gray-500">
                  Select up to 5 cause areas that best describe your
                  organization's work
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {causes.map(({ name, icon: Icon }) => (
                    <div key={name} className="flex items-center space-x-2">
                      <Checkbox
                        id={name}
                        checked={selectedCauses.includes(name)}
                        onCheckedChange={() => handleCauseSelection(name)}
                      />
                      <Label
                        htmlFor={name}
                        className="flex items-center space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <CardFooter>
                <Button type="submit" className="w-full">
                  Create Profile
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}