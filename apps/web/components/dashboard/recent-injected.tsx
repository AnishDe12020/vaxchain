import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentInjected() {
  const data = [
    {
      name: "Om Kulkarni",
      email: "om.kulkarni@email.com",
      avatarInitials: "OK",
      time: "10:00 AM",
    },
    {
      name: "Neha Sharma",
      email: "neha.sharma@email.com",
      avatarInitials: "NS",
      time: "2:30 PM",
    },
    {
      name: "Amit Patel",
      email: "amit.patel@email.com",
      avatarInitials: "AP",
      time: "4:45 PM",
    },
    {
      name: "Priya Singh",
      email: "priya.singh@email.com",
      avatarInitials: "PS",
      time: "8:15 PM",
    },
    {
      name: "Rajesh Gupta",
      email: "rajesh.gupta@email.com",
      avatarInitials: "RG",
      time: "10:20 PM",
    },
    {
      name: "Sneha Joshi",
      email: "sneha.joshi@email.com",
      avatarInitials: "SJ",
      time: "3:45 PM",
    },
    {
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      avatarInitials: "RV",
      time: "9:30 AM",
    },
    {
      name: "Shreya Kapoor",
      email: "shreya.kapoor@email.com",
      avatarInitials: "SK",
      time: "1:10 PM",
    },
    {
      name: "Vikas Rajput",
      email: "vikas.rajput@email.com",
      avatarInitials: "VR",
      time: "6:40 PM",
    },
  ];

  return (
    <div className="space-y-8">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{item.avatarInitials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">{item.time}</div>
        </div>
      ))}
    </div>
  );
}
