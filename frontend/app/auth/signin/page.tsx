import Signin from "@/components/auth/Signin";

const page = () => {
  return (
    <div className="grid grid-cols-2">
      <Signin />
      <div className="">image</div>
    </div>
  );
};

export default page;
