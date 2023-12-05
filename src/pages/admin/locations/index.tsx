import AdminBaseLayout from "~/layouts/AdminBaseLayout";

const LocationsHome = () => {
  return <h1 className="text-4xl font-bold">Hello, Locations</h1>;
};

// eslint-disable-next-line
LocationsHome.getLayout = (page: any) => (
  <AdminBaseLayout>{page}</AdminBaseLayout>
);

export default LocationsHome;
