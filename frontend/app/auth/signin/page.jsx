import SigninForm from "/components/auth/SigninForm";
import GuestGuard from "/components/auth/GuestGuard";

const page = () => {
  return (
    <GuestGuard>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <SigninForm />
        <div className="hidden lg-block">
          <div className="hidden lg:block">image</div>
        </div>
      </div>
    </GuestGuard>
  );
};

export default page;
