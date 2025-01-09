import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BsMoonStars, BsCloudSun } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export const DashBoard = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch user info from localStorage
    const user = localStorage.getItem("userInfo");
    if (user) {
      try {
        const userData: User = JSON.parse(user);
        setUserInfo(userData);
      } catch (error) {
        console.error("Failed to parse user info:", error);
        setError("Error loading user information");
      }
    } else {
      setError("User not authenticated");
    }

    setLoading(false);

    // Fetch tasks from an API or use mock data
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Replace this with your actual API call
      const mockTasks: Task[] = [
        { id: 1, title: "Complete Project Report", description: "Write the final report for the project.", dueDate: "2025-02-10", status: "completed" },
        { id: 2, title: "Team Meeting", description: "Discuss project milestones and next steps.", dueDate: "2024-12-15", status: "completed" },
        { id: 3, title: "Bug Fixing", description: "Resolve bugs in the login module.", dueDate: "2025-01-05", status: "pending" },
        { id: 4, title: "Client Feedback", description: "Review feedback from the client and plan changes.", dueDate: "2025-01-20", status: "pending" },
        { id: 5, title: "Deploy to Production", description: "Deploy the latest version of the app to production.", dueDate: "2024-11-30", status: "pending" },
        { id: 6, title: "Design Review", description: "Review UI/UX design for the new feature.", dueDate: "2025-02-10", status: "completed" },
        { id: 7, title: "Test New Feature", description: "Test the new feature for bugs and performance.", dueDate: "2024-12-20", status: "pending" },
        { id: 8, title: "Code Refactoring", description: "Refactor the old codebase for better performance.", dueDate: "2025-03-01", status: "completed" },
        { id: 9, title: "Prepare Presentation", description: "Prepare the slides for the client presentation.", dueDate: "2024-11-15", status: "completed" },
        { id: 10, title: "Marketing Plan", description: "Create a marketing strategy for the product launch.", dueDate: "2025-01-15", status: "pending" }
      ]
      
      setTasks(mockTasks);
    } catch (error) {
      setError("Failed to fetch tasks.");
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-gray-100 text-black"} min-h-screen transition-all`}>
      <header className="bg-purple-900 shadow-md mb-8 p-6 flex justify-between items-center rounded-b-3xl">
        <h1 className="text-3xl font-semibold text-white">Task Manager</h1>
        <div className="flex items-center space-x-4">
          <button
            className="px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition duration-300"
            onClick={toggleDarkMode}
          >
            {/* Only the icon */}
            {darkMode ? <BsMoonStars /> : <BsCloudSun /> }
          </button>
          <img
            src={userInfo.photoURL || 'fallback-image-url.jpg'}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-purple-300">Welcome, {userInfo.displayName}!</h2>
        </div>

        {/* Task List - Vertical Layout */}
        <div className="flex w-full h-[650px] p-4 rounded-lg bg-gray-300 overflow-hidden">
          <div className="w-[50%] p-1">
            <div className="flex flex-col gap-4 w-full h-full overflow-y-scroll">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="relative bg-purple-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-purple-700"
                >
                  {/* Check icon positioned at the top-right for completed tasks */}
                  {task.status === 'completed' && (
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                      <FaCheck className="text-green-500 w-5 h-5" />
                    </div>
                  )}
                  <h4 className="text-xl font-semibold text-white">{task.title}</h4>
                  <p className="text-gray-300">{task.description}</p>
                  <p className="mt-2 text-purple-200">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[50%] h-full m-2 border border-red-500">

          </div>
        </div>

        {/* Rack Information */}
        <div className="bg-purple-800 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-semibold">Rack Information</h3>
          <p className="mt-2">Details about racks will go here...</p>
        </div>
      </main>
    </div>
  );
};
