import SigninForm from "@/components/auth/SigninForm";

const page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <SigninForm />
      <div className="hidden lg-block">
        <div className="hidden lg:block">image</div>
      </div>
    </div>
  );
};

export default page;
