import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  // User,
  // Users,
  // Clock,
  // Home,
  // School,
  // Shield,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Tag } from "lucide-react";

// interface ContactInfo {
//   name: string;
//   email: string;
//   phone: string;
// }

// interface Opportunity {
//   image: string;
//   title: string;
//   organization: string;
//   location: string;
//   position: string;
//   dateRange: string;
//   description: string;
//   address: string;
//   type: string;
//   primaryContact: ContactInfo;
//   secondaryContact?: ContactInfo;
//   categories: string[];
//   requiredDays: string[];
//   lodgingAvailable: boolean;
//   trainingRequired: boolean;
//   backgroundCheckRequired: boolean;
//   referenceCheckRequired: boolean;
//   applyLink: string;
// }

interface ProgressBarProps {
  current: number;
  total: number;
}

interface Organization {
  id: string;
  name: string;
  logo: string;
  causeAreas: string[];
  description: string;
  location: string;
}

const organizationsData: Organization[] = [
  {
    id: "1",
    name: "Green Earth Foundation",
    logo: "https://www.ivolunteer.com.ph/storage/logo_images/GreenEarth_Heritage_Foundation.jpg",
    causeAreas: ["Environment", "Climate Change"],
    description:
      "Dedicated to protecting and preserving our planet's natural resources.",
    location: "Manila, Philippines",
  },
  {
    id: "2",
    name: "Edu-Philippines",
    logo: "https://img.freepik.com/premium-vector/book-logo-template-design-education-icon-sign-symbol_752732-614.jpg",
    causeAreas: ["Education", "Youth Development"],
    description:
      "Empowering Filipino youth through quality education and mentorship programs.",
    location: "Cebu City, Philippines",
  },
  {
    id: "3",
    name: "Health for All PH",
    logo: "https://media.istockphoto.com/id/1200712144/vector/medic-stethoscope-concept-logotype-template-design-business-logo-icon-shape-medic.jpg?s=612x612&w=0&k=20&c=O3Tem0JD-Xn3oJi6x3hIh2hrd0F8COzUh5LvkLj9Zbw=",
    causeAreas: ["Health", "Community Welfare"],
    description:
      "Providing accessible healthcare services to underserved communities across the Philippines.",
    location: "Davao City, Philippines",
  },
];

const OrganizationCard: React.FC<{ organization: Organization }> = ({
  organization,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex flex-col h-full">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={organization.logo}
              alt={organization.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                {organization.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {organization.causeAreas.map((area, index) => (
                  <Badge key={index} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4 flex-grow">
            {organization.description}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {organization.location}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t p-4">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-4">
      <div className="bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="block text-center mt-2 text-sm font-medium text-gray-700">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

// const OpportunityDetails: React.FC<{ opportunity: Opportunity }> = ({
//   opportunity,
// }) => {
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
//       <div className="relative h-64 rounded-t-lg overflow-hidden mb-6">
//         <img
//           src={opportunity.image}
//           alt={opportunity.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <h1 className="text-4xl font-bold text-white text-center">
//             {opportunity.title}
//           </h1>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Description</h2>
//         <p className="text-gray-600">{opportunity.description}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Position Details</h3>
//           <ul className="space-y-4">
//             <li className="flex items-start">
//               <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" />
//               <div>
//                 <p className="font-semibold">Address</p>
//                 <p>{opportunity.address}</p>
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Type</p>
//                 <p>{opportunity.type}</p>
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Calendar className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Dates</p>
//                 <p>{opportunity.dateRange}</p>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <User className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" />
//               <div>
//                 <p className="font-semibold">Point of Contact</p>
//                 <p>{opportunity.primaryContact.name}</p>
//                 <p>{opportunity.primaryContact.email}</p>
//                 <p>{opportunity.primaryContact.phone}</p>
//               </div>
//             </li>
//             {opportunity.secondaryContact && (
//               <li className="flex items-start">
//                 <Users className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" />
//                 <div>
//                   <p className="font-semibold">Secondary Point of Contact</p>
//                   <p>{opportunity.secondaryContact.name}</p>
//                   <p>{opportunity.secondaryContact.email}</p>
//                   <p>{opportunity.secondaryContact.phone}</p>
//                 </div>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
//           <ul className="space-y-4">
//             <li className="flex items-center">
//               <School className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Category</p>
//                 {opportunity.categories.map((category, index) => (
//                   <p key={index}>{category}</p>
//                 ))}
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Required Days</p>
//                 <p>{opportunity.requiredDays.join(", ")}</p>
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Home className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">
//                   Lodging Available for Opportunity
//                 </p>
//                 <p>{opportunity.lodgingAvailable ? "Yes" : "No"}</p>
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Shield className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Training Required</p>
//                 <p>{opportunity.trainingRequired ? "Yes" : "No"}</p>
//               </div>
//             </li>
//             <li className="flex items-center">
//               <Shield className="w-5 h-5 mr-2 text-blue-500" />
//               <div>
//                 <p className="font-semibold">Background Check Required</p>
//                 <p>{opportunity.backgroundCheckRequired ? "Yes" : "No"}</p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="mt-6 text-center">
//         <Button
//           variant="default"
//           size="lg"
//           onClick={() => window.open(opportunity.applyLink, "_blank")}
//         >
//           Apply Now
//         </Button>
//       </div>
//     </div>
//   );
// };

const OrganizationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [causeArea, setCauseArea] = useState("all");

  const filteredOrganizations = organizationsData.filter(
    (org) =>
      (org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (org.location.toLowerCase().includes(location.toLowerCase()) ||
        location === "") &&
      (causeArea === "all" ||
        org.causeAreas.some((area) =>
          area.toLowerCase().includes(causeArea.toLowerCase())
        ))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-white text-center drop-shadow-2xl">
          Discover Organizations
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-lg p-8"
        >
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <Input
                type="text"
                id="org-search"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <Input
                type="text"
                id="org-location"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Tag className="absolute top-3 left-3 text-gray-400" />
              <Select value={causeArea} onValueChange={setCauseArea}>
                <SelectTrigger className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select a cause area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cause Areas</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="human rights">Human Rights</SelectItem>
                  <SelectItem value="poverty">Poverty Alleviation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredOrganizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OrganizationCard organization={org} />
            </motion.div>
          ))}
        </motion.div>

        {filteredOrganizations.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 mt-12 text-lg"
          >
            No organizations found matching your criteria.
          </motion.p>
        )}
      </div>
    </div>
  );
};

const DiscoverOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [positionType, setPositionType] = useState("all");
  const [lodging, setLodging] = useState("all");
  const [organization, setOrganization] = useState("all");
  const [location, setLocation] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const opportunities = [
    {
      image:
        "https://www.redcross.org/content/dam/redcross/about-us/news/2020/philrctyphoonvamco1_002.jfif.jpg",
      title: "Typhoon Julian Rescue Volunteer",
      organization: "Philippine Red Cross",
      location: "Manila, Philippines",
      position: "Rescue Volunteer",
      dateRange: "11/1/2024 - 11/1/2025",
      description:
        "Join the Philippine Red Cross in their efforts to provide relief and assistance to communities affected by Typhoon Julian. Volunteers will help with rescue operations, first aid, and distribution of essential supplies.",
      address: "123 Rescue Street, Manila, Philippines",
      type: "On-Site Position",
      primaryContact: {
        name: "Maria Santos",
        email: "maria.santos@redcross.ph",
        phone: "+63 123 456 7890",
      },
      categories: ["Disaster Relief", "Emergency Response"],
      requiredDays: ["Weekdays", "Weekends"],
      lodgingAvailable: true,
      trainingRequired: true,
      backgroundCheckRequired: true,
      referenceCheckRequired: false,
      applyLink: "/application-form",
      currentVolunteers: 15,
      totalVolunteersNeeded: 50,
    },
    {
      image:
        "https://goodneighbors.ph/wp-content/uploads/2021/01/Sagrada-F.jpg",
      title: "Community Development Volunteer",
      organization: "Gawad Kalinga",
      location: "Bulacan, Philippines",
      position: "Community Development Volunteer",
      dateRange: "03/15/2024 - 06/15/2024",
      description:
        "Work with Gawad Kalinga to build sustainable communities.  Tasks include assisting with housing construction, teaching livelihood skills, and organizing community events.",
      address: "Gawad Kalinga Enchanted Farm, Angat, Bulacan, Philippines",
      type: "On-Site Position",
      primaryContact: {
        name: "Anna Reyes",
        email: "anna.reyes@gk.org.ph",
        phone: "+63 987 654 3210",
      },
      categories: ["Community Development", "Construction", "Education"],
      requiredDays: ["Weekdays"],
      lodgingAvailable: true,
      trainingRequired: true,
      backgroundCheckRequired: false,
      referenceCheckRequired: false,
      applyLink: "/application-form",
      currentVolunteers: 8,
      totalVolunteersNeeded: 20,
    },
    {
      image:
        "https://images.takeshape.io/86ce9525-f5f2-4e97-81ba-54e8ce933da7/dev/0ad17433-095a-4238-aa30-f451ace1da8d/4.jpg?auto=compress%2Cformat&w=1440",
      title: "Mangrove Planting and Coastal Conservation",
      organization: "WWF Philippines",
      location: "Palawan, Philippines",
      position: "Environmental Conservation Volunteer",
      dateRange: "05/01/2024 - 05/31/2024",
      description:
        "Participate in mangrove planting activities, coastal cleanups, and environmental awareness campaigns in Palawan.",
      address: "Puerto Princesa City, Palawan, Philippines",
      type: "On-Site Position",
      primaryContact: {
        name: "Jose Cruz",
        email: "jose.cruz@wwf.org.ph",
        phone: "+63 912 345 6789",
      },
      categories: ["Environmental Conservation", "Coastal Management"],
      requiredDays: ["Weekends"],
      lodgingAvailable: false,
      trainingRequired: true,
      backgroundCheckRequired: false,
      referenceCheckRequired: true,
      applyLink: "/application-form",
      currentVolunteers: 25,
      totalVolunteersNeeded: 100,
    },
    {
      image:
        "https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1090].jpeg",
      title: "English Teacher for Underserved Youth",
      organization: "ASPIRE Philippines",
      location: "Quezon City, Philippines",
      position: "Teacher/Educator",
      dateRange: "07/01/2024 - 08/31/2024",
      description:
        "Teach English to underserved youth in Quezon City and help them improve their communication skills.",
      address: "101 Education Street, Quezon City, Philippines",
      type: "On-Site Position",
      primaryContact: {
        name: "Sofia Rodriguez",
        email: "sofia.rodriguez@aspire.org.ph",
        phone: "+63 999 888 7777",
      },
      categories: ["Education", "Youth Development"],
      requiredDays: ["Weekdays"],
      lodgingAvailable: false,
      trainingRequired: false,
      backgroundCheckRequired: true,
      referenceCheckRequired: true,
      applyLink: "/application-form",
      currentVolunteers: 5,
      totalVolunteersNeeded: 15,
    },
    {
      image:
        "https://securitydebrief.com/wp-content/uploads/2017/09/USCG-Irma.jpg",
      title: "Disaster Relief Coordinator",
      organization: "Caritas Philippines",
      location: "Tacloban City, Philippines",
      position: "Disaster Relief Coordinator",
      dateRange: "09/15/2024 - 12/15/2024",
      description:
        "Coordinate disaster relief efforts, including needs assessments, resource mobilization, and distribution of aid to affected communities.",
      address: "Caritas Philippines Office, Tacloban City, Philippines",
      type: "On-Site Position",
      primaryContact: {
        name: "David Garcia",
        email: "david.garcia@caritas.org.ph",
        phone: "+63 900 111 2222",
      },
      categories: ["Disaster Relief", "Project Management"],
      requiredDays: ["Weekdays"],
      lodgingAvailable: true,
      trainingRequired: true,
      backgroundCheckRequired: true,
      referenceCheckRequired: true,
      applyLink: "/application-form",
      currentVolunteers: 3,
      totalVolunteersNeeded: 10,
    },
  ];

  const [filteredOpportunities, setFilteredOpportunities] =
    useState(opportunities);

  useEffect(() => {
    const filtered = opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "all" || opportunity.categories.includes(category);
      const matchesPositionType =
        positionType === "all" || opportunity.type === positionType;
      const matchesLodging =
        lodging === "all" ||
        (lodging === "available" && opportunity.lodgingAvailable) ||
        (lodging === "notAvailable" && !opportunity.lodgingAvailable);
      const matchesOrganization =
        organization === "all" || opportunity.organization === organization;
      const matchesLocation =
        location === "all" || opportunity.location === location;

      const opportunityStartDate = new Date(
        opportunity.dateRange.split(" - ")[0]
      );
      const opportunityEndDate = new Date(
        opportunity.dateRange.split(" - ")[1]
      );
      const matchesStartDate =
        startDate === "" || opportunityStartDate >= new Date(startDate);
      const matchesEndDate =
        endDate === "" || opportunityEndDate <= new Date(endDate);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPositionType &&
        matchesLodging &&
        matchesOrganization &&
        matchesLocation &&
        matchesStartDate &&
        matchesEndDate
      );
    });

    setFilteredOpportunities(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    category,
    positionType,
    lodging,
    organization,
    location,
    startDate,
    endDate,
  ]);

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setPositionType("all");
    setLodging("all");
    setOrganization("all");
    setLocation("all");
    setStartDate("");
    setEndDate("");
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <Button
        variant="outline"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );

  const uniqueOrganizations = [
    ...new Set(opportunities.map((o) => o.organization)),
  ];
  const uniqueLocations = [...new Set(opportunities.map((o) => o.location))];

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cdn.tatlerasia.com/tatlerasia/i/2024/07/24160438-gettyimages-2163358781_cover_1600x1067.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white text-center drop-shadow-2xl">
          Discover Opportunities
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Narrow Choices</h2>
            <Button
              variant="default"
              className="w-full mb-4"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Keyword
                </label>
                <Input
                  type="text"
                  id="keyword"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Separator className="my-4" />
              <div>
                <label
                  htmlFor="positionType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position Type
                </label>
                <Select value={positionType} onValueChange={setPositionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="On-Site Position">
                      On-Site Position
                    </SelectItem>
                    <SelectItem value="Virtual Position">
                      Virtual Position
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="lodging"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lodging Availability
                </label>
                <Select value={lodging} onValueChange={setLodging}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Options</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="notAvailable">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Organization
                </label>
                <Select value={organization} onValueChange={setOrganization}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Organizations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organizations</SelectItem>
                    {uniqueOrganizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="my-4" />
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Starts After
                </label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ends Before
                </label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Separator className="my-4" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Disaster Relief">
                      Disaster Relief
                    </SelectItem>
                    <SelectItem value="Emergency Response">
                      Emergency Response
                    </SelectItem>
                    <SelectItem value="Community Development">
                      Community Development
                    </SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Environmental Conservation">
                      Environmental Conservation
                    </SelectItem>
                    <SelectItem value="Coastal Management">
                      Coastal Management
                    </SelectItem>
                    <SelectItem value="Youth Development">
                      Youth Development
                    </SelectItem>
                    <SelectItem value="Project Management">
                      Project Management
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <motion.div
            className="w-full md:w-2/3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, opportunities.length)} of{" "}
              {opportunities.length} Opportunities
            </h2>
            <AnimatePresence>
              {currentOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                          <img
                            src={opportunity.image}
                            alt={opportunity.title}
                            className="w-full h-48 object-cover rounded-md hover:opacity-90 transition-opacity duration-300"
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:text-blue-800 transition-colors duration-300">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {opportunity.organization}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Briefcase className="w-4 h-4 mr-2" />
                              <span>{opportunity.position}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{opportunity.dateRange}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <ProgressBar
                              current={opportunity.currentVolunteers}
                              total={opportunity.totalVolunteersNeeded}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full hover:bg-blue-50 transition-colors duration-300"
                            onClick={() => navigate("/event")}
                          >
                            More info
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {renderPagination()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export function VolunteerOpportunities() {
  const [activeTab, setActiveTab] = useState("opportunities");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        <TabsTrigger value="organizations">Organizations</TabsTrigger>
      </TabsList>
      <TabsContent value="opportunities">
        <DiscoverOpportunities />
      </TabsContent>
      <TabsContent value="organizations">
        <OrganizationSearch />
      </TabsContent>
    </Tabs>
  );
}
