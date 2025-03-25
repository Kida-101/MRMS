"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SigninForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-100">
        <div className="text-center space-y-2">
          <div>Logo section</div>
          <h1 className="font-bold tracking-tight">Sign In</h1>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <Input type="email" id="email" placeholder="Enter email" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter password"
            />
          </div>
          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
              Forget password ?
            </a>
          </div>
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
