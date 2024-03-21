import React, {useState, ReactNode} from 'react';

export type Activity = {
  activityName: string;
  role: string;
  startDate: string;
  endDate: string;
  // dateRange: string;
  description: string;
  // tag: string;
  tag: 'CLUBS' | 'ATHLETICS' | 'ACADEMICS' | 'VOLUNTEERING' | 'COMPETITIONS';
};

type ActivitiesContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  updateActivity: (index: number, updatedActivity: Activity) => void;
  createActivity: (newActivity: Activity) => void;
  deleteActivity: (index: number) => void;
};

const ActivitiesContext = React.createContext<ActivitiesContextType>({
  activities: [],
  setActivities: () => {},
  updateActivity: () => {},
  createActivity: () => {},
  deleteActivity: () => {},
});

export const initialActivities: Activity[] = [
  // ... initial activities ...
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

  const createActivity = (newActivity: Activity) => {
    setActivities(prevActivities => [...prevActivities, newActivity]);
  };

  const deleteActivity = (index: number) => {
    setActivities(prevActivities =>
      prevActivities.filter((_, i) => i !== index)
    );
  };

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        updateActivity,
        createActivity,
        deleteActivity,
      }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export default ActivitiesContext;

// export const initialActivities: Activity[] = [
//   {
//     title: 'Tennis State Championships First Place',
//     role: 'Role 1',
//     dateRange: 'Sat Feb 10 2024 - Sun Feb 11 2024',
//     description:
//       'Won First Place at Georgia Tennis State Championships Singles in Athens',
//     category: 'Athletics',
//   },
//   {
//     title: 'FBLA Outreach Officer',
//     role: 'Role 1',
//     dateRange: 'Fri Aug 5 2022 - Mon May 15 2023',
//     description:
//       'Outreach officer for Johns Creek FBLA, managed social media and marketing',
//     category: 'Clubs',
//   },
//   {
//     title: 'AMC 12 Distinguished',
//     role: 'Role 1',
//     dateRange: 'Mon Nov 27 2023 - Mon Nov 27 2023',
//     description: 'Top 2.5% Score at AMC 12 Math Competition',
//     category: 'Competitions',
//   },
// ];
