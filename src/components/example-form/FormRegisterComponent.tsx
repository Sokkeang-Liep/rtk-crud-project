"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { useRegisterUserMutation } from "@/services/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(32, "Username must be at most 32 characters."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters."),
  address: z.object({
    addressLine1: z.string(),
    addressLine2: z.string(),
    road: z.string(),
    linkAddress: z.string(),
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password at least 4 characters"),
  confirmPassword: z.string().min(4, "Confirm password at least 4 characters"),
  profile: z.string(),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Sokkeang",
      phoneNumber: "01066576522",
      address: {
        addressLine1: "Optional",
        addressLine2: "Optional",
        road: "Optional",
        linkAddress: "Optional",
      },
      email: "sokkeang123@gmail.com",
      password: "Sokkeang!123",
      confirmPassword: "Sokkeang!123",
      profile: "https://i.pinimg.com/736x/93/32/76/9332765c9c1279e2bf86fc8ad29af24a.jpg",
    },
  });

  const [register] = useRegisterUserMutation();

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);
      register(data);
      console.log("Registration success");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto border border-slate-200 bg-white shadow-sm rounded-xl">
      <CardHeader className="space-y-1 p-6 border-b border-slate-100">
        <CardTitle className="text-xl font-bold text-slate-900 text-center">Register</CardTitle>
        <CardDescription className="text-xs text-slate-500"></CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">

            <Controller
              name="profile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-profile" className="text-xs font-medium text-slate-700">Profile URL</FieldLabel>
                  <Input {...field} id="form-rhf-input-profile" placeholder="Profile URL" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-username" className="text-xs font-medium text-slate-700">Username</FieldLabel>
                  <Input {...field} id="form-rhf-input-username" placeholder="Username" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-phoneNumber" className="text-xs font-medium text-slate-700">Phone Number</FieldLabel>
                  <Input {...field} id="form-rhf-input-phoneNumber" placeholder="Phone Number" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-email" className="text-xs font-medium text-slate-700">Email</FieldLabel>
                  <Input {...field} id="form-rhf-input-email" type="email" placeholder="Email" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-password" className="text-xs font-medium text-slate-700">Password</FieldLabel>
                  <Input {...field} id="form-rhf-input-password" type="password" placeholder="Password" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel htmlFor="form-rhf-input-confirmPassword" className="text-xs font-medium text-slate-700">Confirm Password</FieldLabel>
                  <Input {...field} id="form-rhf-input-confirmPassword" type="password" placeholder="Confirm Password" className="w-full h-9 border border-slate-200 rounded-md bg-slate-50/50 text-sm focus:bg-white focus:border-slate-400 focus:ring-0 transition-all" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 p-6 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={() => form.reset()} className="h-9 px-4 text-xs font-medium text-slate-600 border-slate-200 hover:bg-slate-50 rounded-lg">
          Reset
        </Button>
        <Button type="submit" form="form-rhf-input" className="h-9 px-4 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}