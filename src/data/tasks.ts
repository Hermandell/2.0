export type Task = {
  id: string;
  title: string;
  status: "backlog" | "todo" | "in progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  type: "bug" | "feature" | "documentation";
  createdAt: string;
  dueDate?: string;
};

export const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD",
    status: "in progress",
    priority: "medium",
    type: "documentation",
    createdAt: "2024-01-15T10:00:00Z",
    dueDate: "2024-02-01T00:00:00Z"
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel",
    status: "backlog",
    priority: "medium",
    type: "documentation",
    createdAt: "2024-01-10T08:00:00Z"
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card",
    status: "todo",
    priority: "high",
    type: "bug",
    createdAt: "2024-01-05T15:30:00Z",
    dueDate: "2024-01-20T00:00:00Z"
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel so we can back",
    status: "backlog",
    priority: "medium",
    type: "feature",
    createdAt: "2024-01-01T09:15:00Z"
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel",
    status: "canceled",
    priority: "medium",
    type: "feature",
    createdAt: "2023-12-25T11:45:00Z"
  }
];