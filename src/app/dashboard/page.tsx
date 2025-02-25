"use client";

import React, { useState } from "react";
import {
  Upload,
  // Search,
  // Bell,
  // Menu,
  // ChevronDown,
  Grid,
  BarChart2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Menu className="h-5 w-5 md:hidden" />
            <h1 className="text-xl font-bold">Portfolio Hub</h1>
          </div>

          <div className="hidden md:flex items-center relative max-w-xs w-full">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs..."
              className="pl-10 border-secondary/10 bg-primary focus:ring-2 focus:ring-secondary/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-white text-[10px]">
                3
              </Badge>
            </Button>

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-secondary/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-md">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="bg-card p-3 rounded-lg shadow-sm">
            <TabsList className="bg-primary p-1 rounded-md w-full max-w-md grid grid-cols-3">
              <TabsTrigger
                value="overview"
                className={`flex items-center gap-2 rounded-md transition-all ${
                  activeTab === "overview"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-secondary/10"
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={`flex items-center gap-2 rounded-md transition-all ${
                  activeTab === "analytics"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-secondary/10"
                }`}
              >
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className={`flex items-center gap-2 rounded-md transition-all ${
                  activeTab === "reports"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-secondary/10"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 mt-0">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Total Designs", value: "124", change: "+12%" },
                { title: "Active Projects", value: "38", change: "+5%" },
                { title: "Team Members", value: "16", change: "0%" },
                { title: "Completed", value: "86", change: "+24%" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm">
                      {stat.title}
                    </p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <Badge className="bg-secondary/10 text-foreground hover:bg-secondary/20">
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Design Grid */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Recent Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground">
                        Image {item}
                      </span>
                    </div>
                    {/* Replace with your actual image */}
                    <div className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Design Project {item}</p>
                      <Badge className="bg-secondary/10 text-xs text-foreground hover:bg-secondary/20">
                        UI/UX
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Updated 2 days ago
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-card"
                          >
                            <AvatarFallback className="text-[10px] bg-secondary/80 text-secondary-foreground">
                              {["JD", "AK", "ML"][i]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Card className="border border-border/50">
              <CardContent className="p-6 h-64 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Analytics content will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <Card className="border border-border/50">
              <CardContent className="p-6 h-64 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Reports content will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
