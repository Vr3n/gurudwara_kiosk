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
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/utils/api";
import { locationFormSchema } from "~/schemas/locationSchemas";
import { toast } from "react-toastify";

interface LocationsHomeProps {
  onClose: () => void;
}

const AddLocationForm: React.FC<LocationsHomeProps> = ({ onClose }) => {
  const {
    data: gurudwaraList,
    isLoading: isGurudwaraLoading,
    refetch: refetchGurudwaras,
  } = api.gurudwara.getAll.useQuery();

  const { mutate } = api.location.create.useMutation({
    onSuccess: async () => {
      toast.success("Location Added successfully!");
      await refetchGurudwaras();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      gurudwaraId: "",
      city: "",
      state: "",
      country: "",
      longitude: "",
      latitude: "",
    },
  });

  const onSubmit = (values: z.infer<typeof locationFormSchema>) => {
    mutate(locationFormSchema.parse(values));
    onClose();
  };

  return (
    <Form {...form}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
          <div className="mb-4 flex justify-end">
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
              name="gurudwaraId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gurudwara</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gurudwara to attach the location to." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isGurudwaraLoading
                        ? "Loading..."
                        : gurudwaraList?.map((gurudwara) => {
                            return (
                              <SelectItem
                                key={gurudwara.id}
                                value={gurudwara.id}
                              >
                                {gurudwara.name}
                              </SelectItem>
                            );
                          })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the city of the gurudwara.
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
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the latitude of the location.
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
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the longitude of the location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the country of the location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the state of the location.
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

const LocationsHome = () => {
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
          Add Location
        </Button>
        {isFormOpen && <AddLocationForm onClose={closeForm} />}
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
          Add Location
        </Button>
      </div> */}
    </div>
  );
};

// eslint-disable-next-line
LocationsHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default LocationsHome;
