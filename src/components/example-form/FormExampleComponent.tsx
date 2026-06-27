"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginUserMutation } from "@/services/auth";

type FormData = {
  email: string;
  password: string;
};

export default function FormExampleComponent() {
  const [loginRequest, { isLoading }] = useLoginUserMutation();

  
  
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginRequest({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("LOGIN SUCCESS:", response);

      toast.success("You have logged in successfully! ");

      reset();
    } catch (err: any) {
      console.log("LOGIN ERROR:", err);

      toast.error(err?.data?.message || err?.message || "Login failed ");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>

          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}