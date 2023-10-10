"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "10AM",
    temp: 30,
    hum: 70,
  },
  {
    name: "11AM",
    temp: 30,
    hum: 72,
  },
  {
    name: "12PM",
    temp: 31,
    hum: 73,
  },
  {
    name: "1PM",
    temp: 32,
    hum: 68,
  },
  {
    name: "2PM",
    temp: 31,
    hum: 75,
  },
  {
    name: "3PM",
    temp: 30,
    hum: 73,
  },
  {
    name: "4PM",
    temp: 29,
    hum: 72,
  },
  {
    name: "5PM",
    temp: 28,
    hum: 71,
  },
  {
    name: "6PM",
    temp: 28,
    hum: 70,
  },
  {
    name: "7PM",
    temp: 27,
    hum: 73,
  },
  {
    name: "8PM",
    temp: 25,
    hum: 72,
  },
  {
    name: "9PM",
    temp: 25,
    hum: 72,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
        />
        <Line type="natural" dataKey="temp" stroke="#adfa1d" />
        <Line type="monotone" dataKey="hum" stroke="#adaa1d" />
      </LineChart>
    </ResponsiveContainer>
  )
}
