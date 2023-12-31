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
import { journalFormSchema } from "~/schemas/journalSchemas";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import dynamic from "next/dynamic";

interface JournalsHomeProps {
  onClose: () => void;
}

const AddJournalForm: React.FC<JournalsHomeProps> = ({ onClose }) => {
  const CKEditor = dynamic(() => import("~/components/Editor/Editor"), {
    ssr: false,
  });

  const form = useForm<z.infer<typeof journalFormSchema>>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      gurudwaraId: "",
      title: "",
      source: "",
    },
  });

  const { data: gurudwaraList, isLoading: isGurudwaraLoading } =
    api.gurudwara.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const { mutate } = api.journal.create.useMutation({
    onSuccess: async () => {
      toast.success("Journal added succesfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof journalFormSchema>) => {
    mutate(journalFormSchema.parse(values));

    onClose();
  };

  return (
    <Form {...form}>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="w-full max-w-xl overflow-x-scroll rounded-lg bg-white p-8 shadow-md ">
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the title of your journal.
                  </FormDescription>
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
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the source of your journal.
                  </FormDescription>
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
                    <Input
                      placeholder="Description"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of your journal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-96 overflow-x-scroll">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <CKEditor
                      value={field.value}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        form.setValue("content", data);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Content of your jounral</FormDescription>
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

const JournalsHome = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: journalList,
    isLoading: isJournalLoading,
    refetch: journalRefetch,
  } = api.journal.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

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
          Add Journal
        </Button>

        {isFormOpen && <AddJournalForm onClose={closeForm} />}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>title</TableHead>
              <TableHead>gurudwara</TableHead>
              <TableHead>source</TableHead>
              <TableHead>description</TableHead>
              <TableHead>created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isJournalLoading ? (
              <p className="font-bold">Loading...</p>
            ) : (
              journalList?.map((journal) => (
                <TableRow key={journal.id}>
                  <TableCell>{journal.title}</TableCell>
                  <TableCell>{journal.gurudwara.name}</TableCell>
                  <TableCell>{journal.source}</TableCell>
                  <TableCell>{journal.description}</TableCell>
                  <TableCell>{journal.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// eslint-disable-next-line
JournalsHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default JournalsHome;
