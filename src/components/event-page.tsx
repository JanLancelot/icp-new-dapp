'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Briefcase, Phone, Mail, CheckCircle, XCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function EventPageComponent() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 500)
    return () => clearTimeout(timer)
  }, [])

  const eventData = {
    image: "https://www.redcross.org/content/dam/redcross/about-us/news/2020/philrctyphoonvamco1_002.jfif.jpg",
    title: "Typhoon Julian Rescue Volunteer",
    organization: "Philippine Red Cross",
    location: "Manila, Philippines",
    position: "Rescue Volunteer",
    dateRange: "11/1/2024 - 11/1/2025",
    description: "Join the Philippine Red Cross in their efforts to provide relief and assistance to communities affected by Typhoon Julian. Volunteers will help with rescue operations, first aid, and distribution of essential supplies.",
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
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative h-96 rounded-t-xl overflow-hidden">
            <img 
              src={eventData.image} 
              alt="Typhoon Julian Rescue" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{eventData.title}</h1>
              <p className="text-xl text-white">{eventData.organization}</p>
            </div>
          </div>
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                <p className="mb-6 text-gray-600">{eventData.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.location}</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.dateRange}</span>
                    </li>
                    <li className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.position}</span>
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.type}</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.primaryContact.name}</span>
                    </li>
                    <li className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.primaryContact.email}</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      <span>{eventData.primaryContact.phone}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {eventData.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">{category}</Badge>
                  ))}
                </div>

                <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    {eventData.trainingRequired ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    <span>Training Required</span>
                  </li>
                  <li className="flex items-center">
                    {eventData.backgroundCheckRequired ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    <span>Background Check Required</span>
                  </li>
                  <li className="flex items-center">
                    {eventData.referenceCheckRequired ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    <span>Reference Check Required</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Volunteer Progress</h2>
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-sm text-gray-600 mb-8">
                  {eventData.currentVolunteers} out of {eventData.totalVolunteersNeeded} volunteers
                </p>

                <div className="flex justify-center">
                  <Button size="lg" asChild>
                    <a href={eventData.applyLink}>Apply Now</a>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}