'use client'
import { useLoginUserMutation } from '@/services/auth';
import {useForm} from 'react-hook-form';
import { toast } from 'sonner';

type formData = {
    email: string,
    password: string
}

export default function FormExampleComponent() {
  //calling login rtk ( custome hook )

  const [loginUser] = useLoginUserMutation();

  //1. declare object using with useForm
  const { register, handleSubmit, reset, setError } = useForm({
    //2. set default value
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //3. create handlesubmit to track value form
  const onSubmit = async (data: formData) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      toast.success("Login successfully!");
    } catch (error) {
      toast.error("Failed to login!");
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans px-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-gray-200"
    >
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Sign in
      </h2>
      

      {/* Email */}
      <div className="mb-4">
        <label className="block text-xs text-gray-600 mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
          focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-xs text-gray-600 mb-1">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
          focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-gray-900 text-white text-sm py-2.5 rounded-md
        hover:bg-black transition"
      >
        Sign in
      </button>

      {/* Footer text */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Don’t have an account? <span className="text-gray-900 font-medium">Create one</span>
      </p>
    </form>
  </div>
);
}