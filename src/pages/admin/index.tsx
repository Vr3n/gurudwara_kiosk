import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const AdminHome = () => {
  return (
    <>
      <p className="text-4xl font-bold">Hello, Friend!</p>
    </>
  );
};

// eslint-disable-next-line
AdminHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default AdminHome;
