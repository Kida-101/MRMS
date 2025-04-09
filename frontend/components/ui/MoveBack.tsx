"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const MoveBack = ({ text }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size={text ? "sm" : "icon"}
      className="cursor-pointer"
    >
      <ArrowLeft />
      {text && <span className="font-semibold">{text}</span>}
    </Button>
  );
};

export default MoveBack;
