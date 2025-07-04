"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  resource: z.string().min(1, "Resource is required"),
  pages: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Must be at least 1"),
  date: z.date({ required_error: "Date is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LogForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resource: "",
      pages: 1,
      date: new Date(),
    },
  });

  function onSubmit(values: FormValues) {
    const log = {
      ...values,
      date: values.date.toISOString(), // Store as ISO string to preserve timezone info. TIMESTAMPTZ in pg
    };
    console.log(log);
  }

  /**
   * Ideally, we have a combobox or something for when the users starts typing the resource.
   * On page load, we fetch all pre-existing resources from the database, this should be super quick.
   * When the user selects the Resource input and/or starts typing, we will show + filter the
   * appropriate resource.
   * */

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md"
      >
        <FormField
          control={form.control}
          name="resource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource</FormLabel>
              <FormControl>
                <Input placeholder="Book, article, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-6 sm:justify-between">
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pages</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full text-white  mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
