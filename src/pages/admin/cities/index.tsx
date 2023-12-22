import AdminBaseLayout from "~/layouts/AdminBaseLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import { cityFormSchema } from "~/schemas/citiesSchemas";
import { toast } from "react-toastify";

interface CitysHomeProps {
  onClose: () => void;
}

const AddCityForm: React.FC<CitysHomeProps> = ({ onClose }) => {
  const { mutate } = api.city.create.useMutation({
    onSuccess: async () => {
      toast.success("City Added successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof cityFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      name: "",
      longitude: 0,
      latitude: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof cityFormSchema>) => {
    mutate(cityFormSchema.parse(values));
    onClose();
  };

  return (
    <Form {...form}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
          <div className="mb-4 flex justify-between">
            <p className="text-2xl font-bold">Add New City</p>
            <Button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name of the city.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Latitude"
                      {...field}
                      type="number"
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the latitude of the city.
                  </FormDescription>
                  <FormDescription>
                    The latitude should be minimum -90 and maximum 90.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Longitude"
                      {...field}
                      type="number"
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the longitude of the city.
                  </FormDescription>
                  <FormDescription>
                    The longitude should be minimum -180 and maximum 180.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
};

const CitysHome = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm"
        />
        <Button
          onClick={openForm}
          className="ml-4 rounded-md bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
        >
          Add City
        </Button>
        {isFormOpen && <AddCityForm onClose={closeForm} />}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{/* Your table content goes here */}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>No results.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* Row(s) selected }
        </div>
        <Button onClick={openForm} className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600">
          Add City
        </Button>
      </div> */}
    </div>
  );
};

// eslint-disable-next-line
CitysHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default CitysHome;
