import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auth.js';
function RegisterPage() {

  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit(async (values) => {
    const res = await registerRequest(values);
    console.log(res);
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='Username' {...register("username", {required: true})} />
        <input type="email" placeholder='Email' {...register("email", {required: true})} />
        <input type="password" placeholder='Password' {...register("password", {required: true})} />
        <button type='submit'>
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage;