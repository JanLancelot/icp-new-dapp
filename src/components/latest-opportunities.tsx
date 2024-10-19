import React from 'react';
import { MapPin, Briefcase, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-4">
      <div className="bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
      </div>
      <motion.span
        className="block text-center mt-2 text-sm font-medium text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(percentage)}%
      </motion.span>
    </div>
  );
};

export function LatestOpportunitiesComponent() {
  const opportunities = [
    {
      image:
        "https://www.redcross.org/content/dam/redcross/about-us/news/2020/philrctyphoonvamco1_002.jfif.jpg",
      title: "Typhoon Julian Rescue Volunteer",
      organization: "Philippine Red Cross",
      location: "Manila, Philippines",
      position: "Rescue Volunteer",
      dateRange: "11/1/2024 - 11/1/2025",
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
      currentVolunteers: 5,
      totalVolunteersNeeded: 15,
    },
    {
      image: "https://securitydebrief.com/wp-content/uploads/2017/09/USCG-Irma.jpg",
      title: "Disaster Relief Coordinator",
      organization: "Caritas Philippines",
      location: "Tacloban City, Philippines",
      position: "Disaster Relief Coordinator",
      dateRange: "09/15/2024 - 12/15/2024",
      currentVolunteers: 3,
      totalVolunteersNeeded: 10,
    },
    {
      image:
        "https://media.cheggcdn.com/media/8f8/8f8d8ae8-36b5-447e-947c-076618279a3d/php1KnYTm",
      organization: "Organization 5",
      title: "Volunteer Position 5",
      location: "Location 5",
      position: "Position",
      dateRange: "Date Range 5",
      currentVolunteers: 12,
      totalVolunteersNeeded: 30,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2
        className="text-4xl font-bold mb-8 pb-2 border-b-2 border-blue-500 w-full text-center text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Opportunities
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative h-48 overflow-hidden group">
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{opportunity.organization}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 hover:text-blue-500 transition-colors duration-300">
                {opportunity.title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{opportunity.position}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{opportunity.dateRange}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  <span>
                    {opportunity.currentVolunteers} / {opportunity.totalVolunteersNeeded} volunteers
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar
                  current={opportunity.currentVolunteers}
                  total={opportunity.totalVolunteersNeeded}
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <Button
                variant="outline"
                className="w-full group hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <span className="mr-2">More info</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="default"
          size="lg"
          className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          See all opportunities
        </Button>
      </motion.div>
    </div>
  );
}