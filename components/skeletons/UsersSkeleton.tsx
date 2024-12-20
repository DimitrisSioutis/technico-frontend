"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function UserPageSkeleton() {
  return (
    <Card className="w-full max-w-xl mx-auto animate-pulse">
      <CardHeader>
        <CardTitle className="h-6 w-1/3 bg-muted rounded"></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-6 bg-muted rounded mb-4"></div>

        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-1/2 bg-muted rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
