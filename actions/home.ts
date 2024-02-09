'use server'
import Task from "@/types/task";
import { MongoClient, ObjectId  } from "mongodb";

import { revalidatePath } from "next/cache";



export async function GetAllTasks(){
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
        const database = client.db('local');
        const movies = database.collection('movies');
        // Query for a movie that has the title 'Back to the Future'
        const tasks = await (movies.find({}).toArray() as unknown) as Array<Task>;
        return tasks.map(el => ({...el, _id: JSON.stringify(el._id)}))
      } catch(error){
        console.log(error)
      }
      finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }

}

export async function deleteTask(taskId: string) {
  // 'use server'
  taskId = taskId.substring(1, taskId.length - 1);
  console.log(taskId)
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
      const database = client.db('local');
      const tasks = database.collection('movies');
      //////////////////////////////// ufffff
      const objectId = new ObjectId(taskId);
      const result = await tasks.deleteOne({ _id: objectId });

      
      if (result.deletedCount == 1) {
          console.log(`Task with ID ${taskId} deleted successfully`);
          revalidatePath('/')
          return {
              message: `Task with ID ${taskId} deleted successfully`
          };
      } else {
          console.log(`No task found with ID ${taskId}`);
          return {
              message: `No task found with ID ${taskId}`
          };
      }
  } finally {
      // Ensure that the client will close when you finish/error
      await client.close();
  }
}


export async function createUserTask(user: string, form: FormData) {
    // 'use server'
    console.log(user)
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    let task = form.get('task')
    let command = form.get('command')
    console.log(form)
    try {
      const database = client.db('local');
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const tasks = await (movies.find({}).toArray() as unknown) as Array<Task>;
      const filterTask = tasks.find(el => el.task == task)
      if(filterTask){
        return {
          message: `Task with ${task} is exsist`
        }
      }else{
        const query = { task, command };
      const movie = await movies.insertOne(query);
      revalidatePath('/')
      console.log(movie);
      return {
        message: "Inserted"
      }
      }
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }