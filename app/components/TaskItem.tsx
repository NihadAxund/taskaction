'use client'
import Task from "@/types/task";
import styles from "../deletebutton.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteTask } from "@/actions/home";
interface TaskProp {
    task: Task
}


export default function TaskItem({task}: TaskProp){
    return (
        <div key={task._id}>
            <div className={styles.container}>
                <p className='m-0'>TaskID: {task._id}</p>

                <button className="btn btn-outline-danger btn-sm p-1 m-1" onClick={()=>delete_btn(task._id)}>
                    Delete Task
                </button>
            </div>
            <p>TaskID: {task.task}</p>
            <p>TaskID: {task.command}</p>
        </div>
    )
}

async function delete_btn(id: string) {
   let data = await deleteTask(id)
   console.log(data);
   return data;
}