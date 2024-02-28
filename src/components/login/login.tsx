"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import "./login.css"

export const myFormSchema = z.object({
    username: z.string({required_error: "Zadejte uživ. jméno"}),
    password: z.string({required_error: "Zadejte heslo"}).min(4, "Zadejte heslo"),
});

export type MyFormFields = z.infer<typeof myFormSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<MyFormFields>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
        username: "",
        password: "",
    },
  });

  return (
        <Form {...form}>
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Vaše uživ. jméno</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Vaše uživ. jméno" {...field} />
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
                        <Input type="text" placeholder="Vaše heslo" {...field} />
                    </FormControl>
                </FormItem>
            )}
            />
        </Form>
  );
}