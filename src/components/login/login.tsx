"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import "./login.css"


const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Uživ jméno musí být dlouhé min. 2 znaky",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  
export function LoginForm() {
    const form = useForm({
      resolver: zodResolver(FormSchema),
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
                          <Input type="password" placeholder="Vaše heslo" {...field} />
                      </FormControl>
                  </FormItem>
              )}
              />
              <Button type="submit">Přihlásit se</Button>
    </Form>
  );
}