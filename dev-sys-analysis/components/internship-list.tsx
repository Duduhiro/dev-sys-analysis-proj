import { Building, MapPin, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for internship posts
const internships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA (On-site)",
    compensation: "$30-35/hr",
    duration: "3 months",
    tags: ["Full-time", "Summer 2024"],
    logo: "/placeholder.svg?height=40&width=40",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Remote",
    compensation: "$25-30/hr",
    duration: "6 months",
    tags: ["Part-time", "Fall 2024"],
    logo: "/placeholder.svg?height=40&width=40",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UX/UI Design Intern",
    company: "Creative Solutions",
    location: "New York, NY (Hybrid)",
    compensation: "$28/hr",
    duration: "4 months",
    tags: ["Full-time", "Spring 2024"],
    logo: "/placeholder.svg?height=40&width=40",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Brand Builders",
    location: "Chicago, IL (On-site)",
    compensation: "$22-26/hr",
    duration: "3 months",
    tags: ["Full-time", "Summer 2024"],
    logo: "/placeholder.svg?height=40&width=40",
    posted: "Just now",
  },
  {
    id: 5,
    title: "Product Management Intern",
    company: "Innovate Inc",
    location: "Austin, TX (On-site)",
    compensation: "$32/hr",
    duration: "6 months",
    tags: ["Full-time", "Fall 2024"],
    logo: "/placeholder.svg?height=40&width=40",
    posted: "5 days ago",
  },
]

export default function InternshipList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {internships.map((internship) => (
        <Card key={internship.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="h-10 w-10 rounded-md border bg-muted">
              <img
                src={internship.logo || "/placeholder.svg"}
                alt={`${internship.company} logo`}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div className="flex-1 space-y-1">
              <CardTitle className="text-lg">{internship.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Building className="mr-1 h-3.5 w-3.5" />
                {internship.company}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-2 text-sm">
            <div className="flex items-start gap-1">
              <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-start gap-1">
              <DollarSign className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>{internship.compensation}</span>
            </div>
            <div className="flex items-start gap-1">
              <Calendar className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>{internship.duration}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {internship.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs text-muted-foreground">Posted {internship.posted}</span>
              <Button>Apply Now</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

