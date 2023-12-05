import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const NewsHome = () => {
  return <h1 className="text-4xl font-bold">Hello, News</h1>;
};

// eslint-disable-next-line
NewsHome.getLayout = (page: any) => <AdminBaseLayout>{page}</AdminBaseLayout>;

export default NewsHome;
