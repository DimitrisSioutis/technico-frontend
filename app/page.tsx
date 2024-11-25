import fetchAll from "./utils/fetchAll";
import { type SimpleUser, type SimpleProperty, type RepairModel } from "./layout-types";
import { Users, Home, Wrench } from "lucide-react";
import Logo from "@/components/navbar/Logo";

export default async function HomePage() {
  const users: SimpleUser[] = await fetchAll("User");
  const properties: SimpleProperty[] = await fetchAll("Property");
  const repairs: RepairModel[] = await fetchAll("Repair");

  const stats = [
    {
      title: "Users",
      count: users.length,
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Properties",
      count: properties.length,
      icon: <Home className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Repairs",
      count: repairs.length,
      icon: <Wrench className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="p-8">
      <Logo />
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center gap-4">
              {stat.icon}
              <div>
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-gray-500">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
