import fetchAll from "../utils/fetchAll";
import { type SimpleUser, type SimpleProperty, type RepairModel } from "./types";
import { Users, Home, Wrench } from "lucide-react";
import Logo from "@/components/navbar/Logo";

export default async function HomePage() {
  const users: SimpleUser[] = await fetchAll("User");
  const properties: SimpleProperty[] = await fetchAll("Property");
  const repairs: RepairModel[] = await fetchAll("Repair");

  const stats = [
    { title: "Users", count: users.length, icon: <Users className="w-12 h-12 text-blue-500" /> },
    { title: "Properties", count: properties.length, icon: <Home className="w-12 h-12 text-green-500" /> },
    { title: "Repairs", count: repairs.length, icon: <Wrench className="w-12 h-12 text-red-500" /> },
  ];

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-8">
          <span className="text-5xl font-extrabold mr-4">WELCOME TO</span>
          <Logo fill="black" width="300" height="100"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="shadow-sm rounded-lg p-8 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {stat.icon}
                  <div>
                    <h3 className="text-3xl font-bold">{stat.count}</h3>
                    <p className="text-lg">{stat.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
