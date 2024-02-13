import React, {useState, ReactNode} from 'react';

export type Activity = {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  category: string;
};

type ActivitiesContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  updateActivity: (index: number, updatedActivity: Activity) => void;
};

const ActivitiesContext = React.createContext<ActivitiesContextType>({
  activities: [],
  setActivities: () => {},
  updateActivity: () => {},
});

export const initialActivities: Activity[] = [
  {
    title: 'Tennis State Championships',
    role: 'Role 1',
    dateRange: 'Date Range 1',
    description: 'Description 1',
    category: 'Volunteering',
  },
  {
    title: 'Activity 2',
    role: 'Role 2',
    dateRange: 'Date Range 2',
    description: 'Description 2',
    category: 'Category 2',
  },
  // Add more activities as needed
];

export const ActivitiesProvider: React.FC<{children?: ReactNode}> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const updateActivity = (index: number, updatedActivity: Activity) => {
    setActivities(prevActivities =>
      prevActivities.map((activity, i) =>
        i === index ? updatedActivity : activity,
      ),
    );
  };

  return (
    <ActivitiesContext.Provider
      value={{activities, setActivities, updateActivity}}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export default ActivitiesContext;
