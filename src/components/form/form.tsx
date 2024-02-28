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
import { getTimeSlot } from "@/lib/db";

const FormSchema = z.object({
  first_name: z.string({ required_error: "Jméno je povinné!" }),
  last_name: z.string({ required_error: "Příjmení je povinné!" }),
  email: z.string({ required_error: "Email je povinný!" }),
  form: z.enum(["0", "1"], { required_error: "Musíte vybrat způsob doučování" }),
  dob: z.date({ required_error: "Datum je povinný!" }),
  timeslot: z.string({ required_error: "Čas je povinný!" })
});

interface Timeslot {
  value: string;
  label: string;
}

function generateTimeslots(): Timeslot[] {
  const timeslots = [];
  const startTime = new Date(0);
  startTime.setUTCHours(7, 0, 0, 0); // Začátek od 7:00

  while (startTime.getUTCHours() < 20) { // Generovat až do 19:45
    const endTime = new Date(startTime.getTime());
    endTime.setUTCMinutes(startTime.getUTCMinutes() + 45);

    const timeslot = {
      value: `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`,
      label: `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`
    };
    timeslots.push(timeslot);

    startTime.setUTCMinutes(startTime.getUTCMinutes() + 60);
  }
  return timeslots;
}

export default function Page({data}: {data: any}) {
  const [date, setDate] = useState<Date>();
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]); 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const generatedTimeslots = generateTimeslots();
  //       setTimeslots(generatedTimeslots);
  //     } catch (error) {
  //       console.error('Chyba při načítání dat:', error);
  //     }
  //   };

  //   fetchData();
  // }, [date]);

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
                        <RadioGroupItem value="0" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prezenčně
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
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
                <input name="day" type="hidden" value={date ? format(date, "PPP") : ""} />
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
                          format(date, "PPP")
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
      </Form>
      </div>
  )
}