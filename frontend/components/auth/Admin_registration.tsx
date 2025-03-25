import React from 'react'
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Admin_registration() {
  return (<div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-150">
          <div className="text-center space-y-2">
            <h1 className="font-bold tracking-tight text-2xl">Admin Registration</h1>
          </div>
          <form className="space-y-4">
          <div className="flex space-x-4 gap-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="text" className="text-sm font-semibold">
                Full Name
              </label>
              <Input
                type="text"
                id="text"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="role" className="text-sm font-semibold">
                Role
              </label>
              <Select>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Admin</SelectItem>
                  <SelectItem value="dark">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-4 gap-x-4">
          <div className="flex-1 space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="youremail@gmial.com"
                required/>
            </div>
            <div className="flex-1 space-y-2 mt-9">
              {/* <label htmlFor="Email" className="text-sm font-semibold">Image
              </label> */}
              </div>
            </div>
            <div className="flex space-x-4 gap-x-4">
              <div className="flex-1 space-y-2">
              <label htmlFor="tel" className="text-sm font-semibold">
                Phone Number
              </label>
              <Input
                type="tel"
                id="tel"
                placeholder="+251 or +07"
                required/>
              </div>
              <div className="flex-1 space-y-2 gap-x-4">
                <label htmlFor="image" className="text-sm font-semibold">Image</label>
                <Input
                type="file"
                accept='image/*'
                />
              </div>
            </div>
            <Button className="w-full" type="submit">Save</Button>
          </form>
        </div>
      </div>
      );
}
