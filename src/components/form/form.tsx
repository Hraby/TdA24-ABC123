"use client"

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils"

// Importy komponent UI
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { cs } from "date-fns/locale";
import { generateTimeSlot } from "@/lib/db";
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  first_name: z.string({ required_error: "Jméno je povinné!" }),
  last_name: z.string({ required_error: "Příjmení je povinné!" }),
  email: z.string({ required_error: "Email je povinný!" }),
  form: z.string({ required_error: "Musíte vybrat způsob doučování" }),
  dob: z.date({ required_error: "Datum je povinný!" }),
  timeslot: z.string({ required_error: "Čas je povinný!" }),
  message: z.string()
});

interface Timeslot {
  value: string;
  label: string;
}

export default function Page({data}: {data: any}) {
  const [date, setDate] = useState<Date>();
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      let formatedDate;
      if (date) {
        formatedDate = new Date(date.toString().replace(/(\d{2})\w{2},/, '$1,'));
        formatedDate.setUTCDate(formatedDate.getUTCDate() + 1);
        formatedDate.setUTCHours(0, 0, 0, 0);
        formatedDate = formatedDate.toISOString();
        console.log(formatedDate)
        const fetchedData = await generateTimeSlot(formatedDate, data.uuid);
        setTimeslots(fetchedData)
      }
    };
    fetchData();
  }, [date]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      form: undefined,
      dob: undefined,
      timeslot: ""
    }
  });

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return date < today || date > nextWeek;
  };

  return (
    <div className="flex flex-col gap-4 py-4">
    <Form {...form}>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Jan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Příjmení</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Novák" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="test@abc123.cz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="form"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Způsob doučování</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    name="form"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="offline" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prezenčně
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="online" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Online
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormItem className="flex flex-col">
                <FormLabel>Datum</FormLabel>
                <input name="day" type="hidden" value={date ? format(date, "P") : ""} />
                <Popover>
                  <PopoverTrigger asChild name="dob">
                    <FormControl>
                      <Button
                        name="dob"
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? (
                          format(date, "P")
                        ) : (
                          <span>Vyberte datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={cs}
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        return isDateDisabled(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent> 
                </Popover>
                <FormMessage />
              </FormItem>
          <FormField
          control={form.control}
          name="timeslot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Čas</FormLabel>
              <input name="timeSlot" type="hidden" value={field.value} />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={!date ? "Nejdříve vyberte datum" : "Vyberte čas"} />
                  </SelectTrigger>
                </FormControl>
                {date && (
                   <SelectContent>
                   {timeslots.map((timeslot) => (
                     <SelectItem key={timeslot.value} value={timeslot.value}>{timeslot.label}</SelectItem>
                   ))}
                  </SelectContent>
                )}
              </Select>
              <FormDescription>
                Jedna vyučovací hodina trvá 45 minut.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zpráva</FormLabel>
                <FormControl>
                  <Textarea name="message" className="resize-none" placeholder="Sem napište zpráva pro lektora" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </Form>
      </div>
  )
}