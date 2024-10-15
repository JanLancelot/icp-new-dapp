import { MapPin, Globe, Star, ChevronRight, Users, Vote, UserCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const reviews = [
  { id: 1, author: "John D.", rating: 5, comment: "Excellent organization with a great mission!" },
  { id: 2, author: "Sarah M.", rating: 4, comment: "Very supportive of the community. Could improve communication." },
  { id: 3, author: "Alex T.", rating: 5, comment: "Fantastic experience volunteering here. Highly recommend!" },
]

const causes = [
  { name: "People with Disabilities", icon: Users },
  { name: "Politics", icon: Vote },
  { name: "Race & Ethnicity", icon: UserCircle },
]

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

const calculateAverageRating = (reviews: Review[]): string => {
  if (reviews.length === 0) return "0.0";
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function OrganizationProfile() {
  const averageRating = calculateAverageRating(reviews)
  const position: [number, number] = [14.80131049728139, 120.9213706539498]

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">Dr. Yanga's Colleges, Inc.</CardTitle>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>182 MacArthur Hwy, Bocaue, 3018 Bulacan, Philippines</span>
              </div>
            </div>
            <Avatar className="w-24 h-24">
              <AvatarImage src="/api/placeholder/100/100" alt="Organization Logo" />
              <AvatarFallback>DY</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cause Areas</h3>
            <div className="flex flex-wrap gap-2">
              {causes.map((cause) => (
                <Badge key={cause.name} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <cause.icon className="w-4 h-4" />
                  {cause.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href="https://dyci.edu.ph" className="text-primary hover:underline">https://dyci.edu.ph</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@dyci.edu.ph" className="text-primary hover:underline">info@dyci.edu.ph</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+63 44 769 1234</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{averageRating} ({reviews.length} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mission Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To inspire and influence the heart of future heroic DYCian leaders through activities that will Harness the leader in every child. Engage every child toward community building. Awaken every child to develop his social conscience. Recognize and respect the diversity of every child. Teach and train the child towards meaningful service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px', width: '100%' }}>
              <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    Dr. Yanga's Colleges, Inc.<br />
                    182 MacArthur Hwy, Bocaue, 3018 Bulacan, Philippines
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Active Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">This organization has no active opportunities.</p>
          <Button variant="outline">
            Find Volunteer Opportunities
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            Write a Review
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}