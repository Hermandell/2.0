import { GenericDataResponse } from "@/types/data";

export const getMockData = (view: string): GenericDataResponse => {
  switch (view) {
    case "tasks":
      return {
        view: "tasks",
        data: [
          {
            id: "TASK-001",
            title: "Implement user authentication",
            status: "in_progress",
            priority: "high",
            assignee: "John Doe",
            createdAt: "2024-01-15T10:30:00Z",
            dueDate: "2024-02-01T23:59:59Z",
            completionRate: "75%",
            department: "Engineering"
          },
          {
            id: "TASK-002",
            title: "Update documentation",
            status: "pending",
            priority: "medium",
            assignee: "Jane Smith",
            createdAt: "2024-01-16T09:15:00Z",
            dueDate: "2024-01-25T23:59:59Z",
            completionRate: "30%",
            department: "Documentation"
          },
          {
            id: "TASK-003",
            title: "Fix production bug",
            status: "completed",
            priority: "critical",
            assignee: "Bob Wilson",
            createdAt: "2024-01-14T15:45:00Z",
            dueDate: "2024-01-15T12:00:00Z",
            completionRate: "100%",
            department: "Engineering"
          }
        ]
      };

    case "users":
      return {
        view: "users",
        data: [
          {
            id: "USR-001",
            name: "John Doe",
            email: "john.doe@example.com",
            department: "Engineering",
            role: "Senior Developer",
            status: "active",
            lastLogin: "2024-01-17T08:30:00Z",
            createdAt: "2023-06-15T10:00:00Z",
            projectCount: 5
          },
          {
            id: "USR-002",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            department: "Documentation",
            role: "Technical Writer",
            status: "active",
            lastLogin: "2024-01-17T09:15:00Z",
            createdAt: "2023-07-01T11:30:00Z",
            projectCount: 3
          },
          {
            id: "USR-003",
            name: "Bob Wilson",
            email: "bob.wilson@example.com",
            department: "Engineering",
            role: "Developer",
            status: "inactive",
            lastLogin: "2024-01-15T14:20:00Z",
            createdAt: "2023-08-10T09:00:00Z",
            projectCount: 2
          }
        ]
      };

    case "events":
      return {
        view: "events",
        data: [
          {
            id: "EVT-001",
            title: "Team Planning Meeting",
            type: "meeting",
            organizer: "Sarah Johnson",
            location: "Conference Room A",
            startDate: "2024-01-20T10:00:00Z",
            endDate: "2024-01-20T11:30:00Z",
            status: "scheduled",
            attendeeCount: 12,
            department: "All Teams"
          },
          {
            id: "EVT-002",
            title: "Technical Workshop",
            type: "workshop",
            organizer: "Mike Brown",
            location: "Training Center",
            startDate: "2024-01-25T14:00:00Z",
            endDate: "2024-01-25T17:00:00Z",
            status: "pending",
            attendeeCount: 25,
            department: "Engineering"
          },
          {
            id: "EVT-003",
            title: "Product Launch",
            type: "conference",
            organizer: "Lisa Anderson",
            location: "Main Auditorium",
            startDate: "2024-02-01T09:00:00Z",
            endDate: "2024-02-01T18:00:00Z",
            status: "scheduled",
            attendeeCount: 150,
            department: "All Teams"
          }
        ]
      };

    default:
      return {
        view: view,
        data: []
      };
  }
};