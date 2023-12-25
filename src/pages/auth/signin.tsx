import { UserAuthForm } from "~/components/forms/UserAuthForm";
import { Card } from "~/components/ui/card";
import { fontSans } from "~/layouts/AdminBaseLayout";
import { cn } from "~/lib/utils";

export default function SigninPage() {
  return (
    <div
      className={cn(
        "container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-green-100 via-blue-200 to-purple-300 font-sans",
        fontSans.variable,
      )}
    >
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 px-6 py-12 shadow-lg sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-2xl font-bold">Gurudwara Kiosk Admin Panel</h2>
          <p className="text-sm font-thin text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <UserAuthForm />
      </Card>
    </div>
  );
}
