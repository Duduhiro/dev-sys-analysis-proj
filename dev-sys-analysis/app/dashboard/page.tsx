import { Search } from "lucide-react"
import InternshipList from "@/components/internship-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">MackAcademya</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search internships..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="sm">
              For Students
            </Button>
            <Button size="sm">For Companies</Button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Internship Opportunities</h2>
            <p className="text-muted-foreground">
              Find and apply to the best internship opportunities from top companies.
            </p>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search internships..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
          <div className="grid gap-6">
            <InternshipList />
          </div>
        </div>
      </main>
    </div>
  )
}