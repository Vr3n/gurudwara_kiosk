import { useState } from 'react';
import AdminBaseLayout from "~/layouts/AdminBaseLayout";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from '~/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

interface MessageFormProps {
  onClose: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onClose }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      source: "",
      description: "",
    },
  });

  const onSubmit = () => {
    console.log("form submitted");
    onClose();
  };

  return (
    <Form {...form}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
          <div className="flex justify-end mb-4">
            <Button
              onClick={onClose}
            >
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormDescription>This is the title of your form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input
                  placeholder="Source"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormDescription>This is the source of your form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormDescription>This is the description of your form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 mt-4 rounded-md hover:bg-blue-600"
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
        <Button onClick={openForm} className="ml-4 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600">
          Add Gurudwara
        </Button>
        {isFormOpen && <MessageForm onClose={closeForm} />}
      </div>
      
        
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow >
              <TableHead ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell >
                {/* Your table content goes here */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
// eslint-disable-next-line
LocationsHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default LocationsHome;
