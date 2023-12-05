import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const HistoriesHome = () => {
  return <h1 className="text-4xl font-bold">Hello, Histories</h1>;
};

// eslint-disable-next-line
HistoriesHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default HistoriesHome;
