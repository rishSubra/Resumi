import React, {useState, ReactNode} from 'react';

type Activity = {
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

export const ActivitiesProvider: React.FC<{children?: ReactNode}> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);

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
