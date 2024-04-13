import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    signIn(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  return (
    <div>
      <div className='flex h-screen items-center justify-center'>
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
          <h1 className='text-2xl font-bold'>Login</h1>
          { signInErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white text-center mt-2' key={i}>
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
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
              Login
            </button>
          </form>
          <p className='flex gap-x-2 justify-between'>
            Don't have an account?
            <Link to='/register' className='text-sky-500'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;