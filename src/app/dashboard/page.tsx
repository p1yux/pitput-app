"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UploadResumePopup from "@/components/custom/Popups/UploadResumePopup";

export default function DashboardPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen">
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
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-md"
            onClick={handleOpenPopup}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        </div>

        {/* Design Grid */}
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Recent Designs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Image {item}</span>
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
        </div>
      </main>
      <UploadResumePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}
