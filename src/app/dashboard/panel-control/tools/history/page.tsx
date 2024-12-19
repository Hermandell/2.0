import { DataTable } from "@/components/data-table/data-table";
import { tasks } from "@/data/tasks";
import { columns } from "@/components/data-table/columns";



const History = () => {
  return (
    <>
      <h1>History</h1>
      <DataTable data={tasks} columns={columns} />
    </>
  )
}

export default History
