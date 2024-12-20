import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const LoadingSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingSkeleton;