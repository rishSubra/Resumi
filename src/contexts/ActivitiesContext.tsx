// src/contexts/ActivitiesContext.tsx
import React from 'react';

type Activity = {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  category: string;
};

const ActivitiesContext = React.createContext<{
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}>({
  activities: [],
  setActivities: () => {},
});

export default ActivitiesContext;
