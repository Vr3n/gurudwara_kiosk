import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const JournalsHome = () => {
  return <h1 className="text-4xl font-bold">Hello, Journals</h1>;
};

// eslint-disable-next-line
JournalsHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default JournalsHome;
