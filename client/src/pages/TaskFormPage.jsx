import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from "../context/TaskContext.jsx";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('date', dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const validData = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    };
    if (params.id) await updateTask(params.id, validData);
    else createTask(validData);
    navigate('/tasks');
  });

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="title" autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("title")}
          />
          <label htmlFor="description">Description</label>
          <textarea rows="3" placeholder="description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("description")}
          ></textarea>
          <label htmlFor="date">Date</label>
          <input type="date"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("date")}
          ></input>
          <button type="submit" className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 my-2 rounded'>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage;