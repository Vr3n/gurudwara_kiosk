import AdminBaseLayout from "~/layouts/AdminBaseLayout";
import { useSession } from "next-auth/react";

const AdminHome = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    <h1 className="text-4xl font-bold text-blue-500">Loading...</h1>;
  }

  return (
    <h1 className="text-4xl font-bold">
      Hello <span className="text-blue-500">{session?.user?.email}</span>
    </h1>
  );
};

// eslint-disable-next-line
AdminHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default AdminHome;
