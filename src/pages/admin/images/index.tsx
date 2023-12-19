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
import { imageFormSchema } from "~/schemas/imageSchemas";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface ImagesHomeProps {
  onClose: () => void;
}

const AddImageForm: React.FC<ImagesHomeProps> = ({ onClose }) => {
  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      gurudwaraId: "",
      title: "",
      source: "",
    },
  });

  const {
    data: gurudwaraList,
    isLoading: isGurudwaraLoading,
    refetch: refetchGurudwaras,
  } = api.gurudwara.getAll.useQuery();

  const { mutate } = api.image.create.useMutation({
    onSuccess: async () => {
      toast.success("Image added succesfully!");
      await refetchGurudwaras();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof imageFormSchema>) => {
    mutate(imageFormSchema.parse(values));
    onClose();
  };

  return (
    <Form {...form}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md"
          >
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      type="image"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
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

const ImageHome = () => {
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
          Add Image
        </Button>

        {isFormOpen && <AddImageForm onClose={closeForm} />}
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
    </div>
  );
};

// eslint-disable-next-line
ImageHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default ImageHome;
