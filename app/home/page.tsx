import Image from "next/image";
import fs from 'fs'
import styles from './home.module.css'
import { GetAllTasks, createUserTask } from "@/actions/home";
import TaskItem from "../components/TaskItem";
import Task from "@/types/task";
import Tasks from "../components/Tasks";


async function getAll() {
    const tasks = await GetAllTasks()
    return tasks || []

}
//  export async function getServerSideProps() {
//     const tasks = await GetAllTasks()
//     return {
//         props: {tasks}
//     }
//  }

export default async function Home() {
    const tasks = await getAll()
    console.log(tasks)
    return (
        <main className={styles.container}>

            <Tasks tasks={tasks} />
        </main>
    );
}
