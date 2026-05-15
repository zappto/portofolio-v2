import {
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Home,
  Images,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

export const adminNavigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/case-studies", label: "Case Studies", icon: BriefcaseBusiness },
  { href: "/admin/blog", label: "Blog", icon: BookOpenText },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/experience", label: "Experience", icon: FileText },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Wrench },
  { href: "/admin/playground", label: "Playground", icon: Home },
  { href: "/admin/resume", label: "Resume", icon: Images },
  { href: "/admin/guestbook", label: "Guestbook", icon: MessageSquare },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export type AdminNavigationItem = (typeof adminNavigation)[number];
