import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { userLoginSchema } from "~/schemas/userSchemas";
import { buttonVariants } from "~/components/ui/button";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";

export type SignInFormData = z.infer<typeof userLoginSchema>;

type UserAuthFormProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const params = useSearchParams();

  const onSubmit = async (values: SignInFormData) => {
    await signIn("credentials", {
      ...values,
      callbackUrl: params.get("callbackUrl") ?? "/admin",
    });
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your email address"
                        type="email"
                        {...field}
                        className="w-full rounded-md border border-gray-300 p-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="w-full rounded-md border border-gray-300 p-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button
              className={cn(buttonVariants())}
              disabled={!form.formState.isValid}
            >
              {
                // isLoading && (
                // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)
              }
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Form>
  );
}
