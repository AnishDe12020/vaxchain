import path from "path";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/dashboard/tasks/columns";
import { DataTable } from "@/components/dashboard/tasks/data-table";
import { taskSchema } from "@/components/dashboard/tasks/schema";

async function getTasks() {
  const tasks = [
    {
      "id": "123456",
      "patientName": "Rajesh Kumar",
      "patientId": "AAB1234567",
      "injectedBy": "Dr. Priya Sharma",
      "dateTime": "2023-10-10 14:30"
    },
    {
      "id": "789012",
      "patientName": "Sneha Patel",
      "patientId": "XYZ9876543",
      "injectedBy": "Dr. Rahul Verma",
      "dateTime": "2023-10-11 11:15"
    },
    {
      "id": "345678",
      "patientName": "Preeti Sharma",
      "patientId": "PQR4567890",
      "injectedBy": "Dr. Akash Gupta",
      "dateTime": "2023-10-12 09:45"
    },
    {
      "id": "987654",
      "patientName": "Amit Saxena",
      "patientId": "LMN6543210",
      "injectedBy": "Dr. Neha Singh",
      "dateTime": "2023-10-13 16:20"
    },
    {
      "id": "234567",
      "patientName": "Manish Verma",
      "patientId": "JKL5678901",
      "injectedBy": "Dr. Anjali Kapoor",
      "dateTime": "2023-10-14 13:10"
    },
    {
      "id": "345678",
      "patientName": "Neha Sharma",
      "patientId": "XYZ9876543",
      "injectedBy": "Dr. Rajesh Gupta",
      "dateTime": "2023-10-15 10:45"
    },
    {
      "id": "456789",
      "patientName": "Deepak Yadav",
      "patientId": "MNO2345678",
      "injectedBy": "Dr. Preeti Sharma",
      "dateTime": "2023-10-16 19:15"
    }
  ]
  
  

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Vaccine Records
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your records for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
