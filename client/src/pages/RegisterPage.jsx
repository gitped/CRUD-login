import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    signUp(values);
  })

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <h1 className='text-2xl font-bold'>Register</h1>
        { registerErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center mt-2' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input type="text" placeholder='Username' {...register("username", {required: true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.username && 
            <p className='text-red-500 text-xs'>Username is required</p>
          }
          <input type="email" placeholder='Email' {...register("email", {required: true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.email && 
            <p className='text-red-500 text-xs'>Email is required</p>
          }
          <input type="password" placeholder='Password' {...register("password", {required: true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.password && 
            <p className='text-red-500 text-xs'>Password is required</p>
          }
          <button type='submit' className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 my-2 rounded'>
            Register
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          Already have an account?
          <Link to='/login' className='text-sky-500'>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage;