import { useState, ChangeEvent, FormEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Info, Search, MapPin, Edit2, Award, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface User {
  name: string;
  email: string;
  profilePicture: string;
  causes: string[];
  skills: string[];
  location: string;
  coordinates: { lat: number; lng: number };
}
interface Opportunity {
  applicationNumber: string;
  link: string;
  status: string;
  totalHours: number;
  outstandingHours: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "badge" | "medal";
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "Eco Warrior",
    description: "Participated in 5 environmental cleanup events",
    icon: "🌿",
    type: "badge",
  },
  {
    id: "2",
    name: "Animal Ally",
    description: "Volunteered 50 hours at animal shelters",
    icon: "🐾",
    type: "badge",
  },
  {
    id: "3",
    name: "Education Champion",
    description: "Tutored students for over 100 hours",
    icon: "📚",
    type: "medal",
  },
  {
    id: "4",
    name: "Community Pillar",
    description: "Accumulated 500 total volunteer hours",
    icon: "🏆",
    type: "medal",
  },
];

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9356/9356230.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const mockUser: User = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  profilePicture: "",
  causes: ["Environment", "Education", "Animal Welfare"],
  skills: ["Project Management", "Teaching", "Gardening"],
  location: "San Francisco, CA",
  coordinates: { lat: 37.7749, lng: -122.4194 },
};

const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
};

const mockApplications: Opportunity[] = [
  {
    applicationNumber: "APP002",
    link: "Food Bank",
    status: "Pending",
    totalHours: 0,
    outstandingHours: 0,
  },
  {
    applicationNumber: "APP003",
    link: "Animal Shelter",
    status: "In Review",
    totalHours: 0,
    outstandingHours: 0,
  },
];

const mockActiveOpportunities: Opportunity[] = [
  {
    applicationNumber: "APP001",
    link: "Beach Cleanup",
    status: "Active",
    totalHours: 10,
    outstandingHours: 5,
  },
];

const mockCompletedOpportunities: Opportunity[] = [
  {
    applicationNumber: "APP004",
    link: "Tree Planting",
    status: "Completed",
    totalHours: 8,
    outstandingHours: 0,
  },
];

const mockCancelledOpportunities: Opportunity[] = [
  {
    applicationNumber: "APP005",
    link: "Senior Center",
    status: "Cancelled",
    totalHours: 0,
    outstandingHours: 0,
  },
];

export default function VolunteerDashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [user, setUser] = useState<User>(mockUser);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const filterOpportunities = (opportunities: Opportunity[]) =>
    opportunities.filter((opp) =>
      opp.link.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };
  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderOpportunityTable = (
    opportunities: Opportunity[],
    showHours: boolean
  ) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Application Number <ChevronDown className="inline-block ml-1" />
          </TableHead>
          <TableHead>
            Volunteer Opportunity Link{" "}
            <ChevronDown className="inline-block ml-1" />
          </TableHead>
          <TableHead>
            Status <ChevronDown className="inline-block ml-1" />
          </TableHead>
          {showHours && (
            <>
              <TableHead>
                Total Hours <ChevronDown className="inline-block ml-1" />
              </TableHead>
              <TableHead>
                Outstanding Hours <ChevronDown className="inline-block ml-1" />
              </TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {opportunities.map((opportunity) => (
          <TableRow key={opportunity.applicationNumber}>
            <TableCell>{opportunity.applicationNumber}</TableCell>
            <TableCell>{opportunity.link}</TableCell>
            <TableCell>{opportunity.status}</TableCell>
            {showHours && (
              <>
                <TableCell>{opportunity.totalHours}</TableCell>
                <TableCell>{opportunity.outstandingHours}</TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <div className="w-full bg-blue-900 py-16 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="topo-pattern"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 0 Q 100 50 200 0 Q 100 50 0 100 Q 100 150 200 100 Q 100 150 0 200"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#topo-pattern)"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            My Profile
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-12 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {getInitials(user.name)}
                  </div>
                )}
              </div>

              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <Mail className="mr-2 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <MapPin className="mr-2 text-gray-500" />
                  <span>{user.location}</span>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Causes:</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {user.causes.map((cause) => (
                      <Badge key={cause} variant="secondary">
                        {cause}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Skills:</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <MapContainer
                  center={[user.coordinates.lat, user.coordinates.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[user.coordinates.lat, user.coordinates.lng]}
                    icon={customIcon}
                  >
                    <Popup>
                      {user.name}
                      <br />
                      {user.location}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="mt-4 text-center">
              <EditProfileDialog user={user} onUpdate={handleUserUpdate} />
            </div>
          </CardContent>
        </Card>
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4">My Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockAchievements.map((achievement) => (
              <TooltipProvider key={achievement.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full h-24 flex flex-col items-center justify-center ${
                        selectedAchievement?.id === achievement.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => handleAchievementClick(achievement)}
                    >
                      <span className="text-3xl mb-2">{achievement.icon}</span>
                      <span className="text-sm font-semibold">
                        {achievement.name}
                      </span>
                      <Badge
                        variant={
                          achievement.type === "badge"
                            ? "secondary"
                            : "destructive"
                        }
                        className="mt-1"
                      >
                        {achievement.type}
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{achievement.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </section>

        {selectedAchievement && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 mr-4 text-yellow-500" />
                <h3 className="text-2xl font-bold">
                  {selectedAchievement.name}
                </h3>
              </div>
              <p className="text-gray-600">{selectedAchievement.description}</p>
            </CardContent>
          </Card>
        )}

        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4">My Volunteer Journey</h2>
          <p className="mb-4">
            Track your volunteer applications and opportunities here. Ready to
            make a difference? Browse the latest opportunities in{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Discover Opportunities
            </a>{" "}
            and find something that sparks your passion.
          </p>
          <p>
            Contact the Volunteer Coordinator for more information about your
            applications or active opportunities.
          </p>
        </section>

        <div className="flex items-center mb-4">
          <Search className="mr-2" />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">APPLICATIONS</h3>
          {renderOpportunityTable(filterOpportunities(mockApplications), false)}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">ACTIVE OPPORTUNITIES</h3>
          {renderOpportunityTable(
            filterOpportunities(mockActiveOpportunities),
            true
          )}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">COMPLETED OPPORTUNITIES</h3>
          {renderOpportunityTable(
            filterOpportunities(mockCompletedOpportunities),
            true
          )}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">CANCELLED OPPORTUNITIES</h3>
          {renderOpportunityTable(
            filterOpportunities(mockCancelledOpportunities),
            false
          )}
        </section>

        <section className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Total Lifetime Hours: 18</span>
            <Info className="text-gray-500" />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Total Hours for Volunteer Pass: 18</span>
            <Info className="text-gray-500" />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Total Fiscal Year Hours: 18</span>
            <Info className="text-gray-500" />
          </div>
        </section>
      </div>
    </div>
  );
}

interface EditProfileDialogProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

function EditProfileDialog({ user, onUpdate }: EditProfileDialogProps) {
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    const { value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setEditedUser((prev) => ({ ...prev, profilePicture: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(editedUser);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={editedUser.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="causes">Causes (comma-separated)</Label>
            <Input
              id="causes"
              name="causes"
              value={editedUser.causes.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "causes")}
            />
          </div>
          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={editedUser.skills.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "skills")}
            />
          </div>
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input
              id="profilePicture"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
