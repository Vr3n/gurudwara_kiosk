import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const GurudwaraHome = () => {
  return <h1 className="text-4xl font-bold">Hello, Gurudwaras</h1>;
};

// eslint-disable-next-line
GurudwaraHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default GurudwaraHome;
