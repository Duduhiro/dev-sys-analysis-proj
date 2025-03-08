"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Calendar, DollarSign, MapPin, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
  responsibilities: z.string().min(10, { message: "Responsibilities must be at least 10 characters" }),
  locationType: z.string().min(1, { message: "Please select a location type" }),
  location: z.string().min(1, { message: "Please provide a location" }),
  compensationType: z.string().min(1, { message: "Please select a compensation type" }),
  compensationAmount: z.string().min(1, { message: "Please provide compensation amount" }),
  duration: z.string().min(1, { message: "Please select a duration" }),
  startDate: z.string().min(1, { message: "Please provide a start date" }),
  applicationDeadline: z.string().min(1, { message: "Please provide an application deadline" }),
  isFullTime: z.boolean().default(true),
  educationLevel: z.string().min(1, { message: "Please select an education level" }),
  publishNow: z.boolean().default(true),
})

export default function PostInternshipPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      responsibilities: "",
      locationType: "",
      location: "",
      compensationType: "",
      compensationAmount: "",
      duration: "",
      startDate: "",
      applicationDeadline: "",
      isFullTime: true,
      educationLevel: "",
      publishNow: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Add skills to the form data
    const formData = {
      ...values,
      skills,
    }

    // Simulate API call
    setTimeout(() => {
      console.log(formData)
      setIsLoading(false)
      router.push("/dashboard/company")
    }, 1500)
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/company" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-xl font-bold">Post New Internship</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Create Internship Opportunity</CardTitle>
              <CardDescription>Fill out the form below to post a new internship opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internship Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Software Engineering Intern" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the internship opportunity..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Requirements</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List the requirements for this position..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="responsibilities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Responsibilities</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List the responsibilities for this position..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Location & Compensation</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="locationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="on-site">On-site</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g. San Francisco, CA" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="compensationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compensation Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select compensation type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="stipend">Stipend</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="compensationAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compensation Amount</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g. 20-25/hr or 1000/month" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Duration & Dates</h3>

                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-month">1 Month</SelectItem>
                                <SelectItem value="2-months">2 Months</SelectItem>
                                <SelectItem value="3-months">3 Months</SelectItem>
                                <SelectItem value="4-months">4 Months</SelectItem>
                                <SelectItem value="6-months">6 Months</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="applicationDeadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Application Deadline</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="isFullTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Full-time internship</FormLabel>
                            <FormDescription>Uncheck if this is a part-time internship opportunity</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Skills & Qualifications</h3>

                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Education Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="associate">Associate Degree</SelectItem>
                              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                              <SelectItem value="master">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="any">Any Level</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Required Skills</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1">
                            {skill}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove {skill}</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill (e.g. JavaScript, Design, Research)"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addSkill()
                            }
                          }}
                        />
                        <Button type="button" onClick={addSkill} disabled={!newSkill}>
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add Skill</span>
                        </Button>
                      </div>
                      <FormDescription>Add skills that are required for this internship position</FormDescription>
                    </div>
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="publishNow"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Publish immediately</FormLabel>
                          <FormDescription>Uncheck if you want to save as draft and publish later</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 justify-end">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard/company">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Posting..." : "Post Internship"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}