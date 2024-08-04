"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { tasks } from "./tasks"; // Adjust the import path as needed
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import { NewTask } from "@/components/NewTask";
import { useState } from "react";
export default function Home() {
  const [showTaskDialog, setshowTaskDialog] = useState(false);
  const getClassForBadge = (label) => {
    if (label === "Feature") return "bg-green-500 text-white px-2 py-1 rounded";
    if (label === "Improvement")
      return "bg-orange-500 text-white px-2 py-1 rounded";
    if (label === "Bug") return "bg-red-500 text-white px-2 py-1 rounded";
    return "bg-gray-500 text-white px-2 py-1 rounded";
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card key={task.id} className="mb-2 p-0">
          <CardHeader>
            <CardTitle>PFS-4599 : {task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span
                className={getClassForBadge(task.label)}
                style={{ fontSize: 10 }}
              >
                {task.label}
              </span>
              <span className="flex items-center space-x-2  ">
                <img
                  src={`https://robohash.org/${task.assignedTo}`}
                  alt={task.assignedTo}
                  className="w-6 h-6 rounded-full border-gray border-green-500"
                />
              </span>
            </div>
          </CardContent>
        </Card>
      ));
  };

  return (
    <main className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex">
          <Image src={"/teevralogo.png"} width={120} height={80} alt="logo" />

          <Button onClick={() => setshowTaskDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span>WorkSpace:</span>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Supreme Technologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Supreme Technologies</SelectItem>
              <SelectItem value="dark">Lowcars Pvt Ltd</SelectItem>
            </SelectContent>
          </Select>
          Sprint :
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sprint 1.94" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sprint 1.92</SelectItem>
              <SelectItem value="dark">Sprint 1.93</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex space-x-4 p-10">
        {/* Todo Section */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">To Do</h2>
          {renderTasks("todo")}
        </div>

        {/* In-Progress Section */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">In Progress</h2>
          {renderTasks("in-progress")}
        </div>

        {/* Done Section */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Done</h2>
          {renderTasks("done")}
        </div>
      </div>
      <NewTask
        showTaskDialog={showTaskDialog}
        setshowTaskDialog={setshowTaskDialog}
      />
    </main>
  );
}
