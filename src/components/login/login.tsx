"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import "./login.css"
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Uživ jméno musí být dlouhé min. 2 znaky",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });
  
  type FormData = z.infer<typeof FormSchema>;
  
export function LoginForm() {
    const router = useRouter();

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { username: username, password: password } = data;

    const response: any = await signIn("credentials", {
        username,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
    });

    // try {
    //     const response: any = await signIn("credentials", {
    //       username,
    //       password,
    //       redirect: false,
    //     });
    //     if (!response?.error) {
    //       router.push("/");
    //       router.refresh();
    //     }
  
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     console.log("Login Successful", response);
    //     toast({ title: "Login Successful" });
    //   } catch (error: any) {
    //     console.error("Login Failed:", error.message);
    //     toast({ title: "Login Failed", description: error.message });
    //   }
    };

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="form">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Vaše uživ. jméno</FormLabel>
                        <FormControl>
                            <Input name="username" type="text" placeholder="Vaše uživ. jméno" {...field} />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Vaše heslo</FormLabel>
                        <FormControl>
                            <Input name="password" type="password" placeholder="Vaše heslo" {...field} />
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit">Přihlásit se</Button>
            </form>
    </Form>
  );
}