import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const FundQrCodesHome = () => {
  return <h1 className="text-4xl font-bold">Hello, QR Code</h1>;
};

// eslint-disable-next-line
FundQrCodesHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default FundQrCodesHome;
