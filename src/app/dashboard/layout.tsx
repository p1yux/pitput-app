import React from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  Settings,
  Users,
  BarChart2,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Logo or Brand */}
          <div className="flex items-center space-x-2 py-2">
            <Menu className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-primary">
              Dashboard
            </span>
          </div>

          <Separator />

          {/* Navigation Links */}
          <nav className="space-y-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-primary/10 text-primary font-medium"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2"
                    >
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/analytics"
                className="flex items-center space-x-2"
              >
                <BarChart2 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/users"
                className="flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/reports"
                className="flex items-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/notifications"
                className="flex items-center space-x-2"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
            </Button>
          </nav>
        </div>

        <div className="pt-6">
          <Separator className="mb-6" />
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  );
}
