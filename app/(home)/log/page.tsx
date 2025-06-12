import { Input } from "@/components/ui/input";
import React from "react";
import LogForm from "./form";

export default function LogPage() {
  return (
    <div
      className="flex items-center justify-center px-4"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className="w-md">
        <h1 className="mb-6 font-bold text-2xl">New log.</h1>

        <LogForm />
      </div>
    </div>
  );
}
