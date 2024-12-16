import { Archive, Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

import { getLoggedInUser } from "@/lib/server/appwrite"
import Link from "next/link"
import { ModeToggle } from "./modeToggle"
import SignOutButton from "./signOutButton"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/signin",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]




export async function Nav() {
  const user = await getLoggedInUser()

  if (user !== null) {
    console.log(user)
  }
  return (
    <Sidebar>
    <SidebarHeader>
        <div className="flex gap-2 items-center"><Archive strokeWidth={2} /><h1 className="text-2xl !font-extrabold">ShelfSpace</h1></div>
    </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon strokeWidth={3} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex gap-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 strokeWidth={3} /> {user? user.name: "Sign in"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {user? <div>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SignOutButton />
                    </DropdownMenuItem>
                  </div>: <div>
                    <DropdownMenuItem asChild>
                      <Link href="signup" className="cursor-pointer">Sign up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signin" className="cursor-pointer">Sign in</Link>
                    </DropdownMenuItem>
                  </div>}
                  
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>          
    </Sidebar>
  )
}
