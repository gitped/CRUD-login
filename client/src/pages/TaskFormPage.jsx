import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext.jsx";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit((values) => {
    createTask(values);
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="title" autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("title")}
        />
        <textarea rows="3" placeholder="description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        ></textarea>
        <button type="submit" className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 my-2 rounded'>
          Save
        </button>
      </form>
    </div>
  )
}

export default TaskFormPage;