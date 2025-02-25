"use client";

import React, { useState } from "react";
import { Home, Users, BarChart, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this is correctly imported

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-secondary transition flex flex-col p-4 text-center text-secondary-foreground",
        isExpanded ? "w-48" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Top section - currently commented out */}
      <div className="flex items-center mb-12 mt-16">
        <div className="flex items-center justify-center p-1 rounded-full bg-primary text-secondary-foreground">
          <User className="w-6 h-6 text-secondary" />
        </div>
        {isExpanded && (
          <span className="text-xl ml-4 text-secondary-foreground">
            John Doe
          </span>
        )}
      </div>

      {/* Navigation section - now with flex-1 to take available space and justify-center */}
      <nav className="flex flex-col">
        <div className="space-y-8">
          <SidebarItem Icon={Home} text="Dashboard" isExpanded={isExpanded} />
          <SidebarItem Icon={Users} text="Users" isExpanded={isExpanded} />
          <SidebarItem
            Icon={BarChart}
            text="Analytics"
            isExpanded={isExpanded}
          />
          <SidebarItem
            Icon={Settings}
            text="Settings"
            isExpanded={isExpanded}
          />
        </div>
      </nav>
    </div>
  );
};

const SidebarItem = ({
  Icon,
  text,
  isExpanded,
}: {
  Icon: React.ElementType;
  text: string;
  isExpanded: boolean;
}) => {
  return (
    <div className="flex items-center space-x-2 text-secondary-foreground rounded-lg opacity-80 hover:opacity-100 cursor-pointer">
      <Icon className="w-6 h-6" />
      {isExpanded && <span>{text}</span>}
    </div>
  );
};

export default Sidebar;
