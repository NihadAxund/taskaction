'use client'
import Task from "@/types/task";
import TaskItem from "./TaskItem";
import { createUserTask } from "@/actions/home";
import { useFormState } from "react-dom";

const initialState = {
    message: '',
}

export default function Tasks({ tasks }: { tasks: Task[] }) {
    const createTaskByUser = createUserTask.bind(null, "Nihad")
    // @ts-ignore
    const [state, stateAction] = useFormState(createUserTask, initialState)
    return (
        <main>
            <form action={stateAction} method="POST">
                <div>
                    <label htmlFor="email">Task:</label>
                    <input type="text" id="email" name="task" required />
                </div>
                <div>
                    <label htmlFor="command">Command:</label>
                    <input type="text" id="command" name="command" required />
                </div>
                <p aria-live="polite" className="sr-only">
                    {state?.message}
                </p>
                <button type="submit">Add task</button>
            </form>

            {
                tasks?.map(el => <TaskItem task={el} key={el._id} />)
            }
        </main>
    )
}