import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ReactNode } from "react";

type TProps = {
  title: string;
  growth?: string;
  amount: string;
  days?: string;
  increase?: boolean;
  icon?: ReactNode;
};

export default function StatCard({
  title,
  growth,
  amount,
  increase,
  icon,
}: TProps) {
  return (
    <div className="bg-section-bg p-6  rounded-xl flex items-center gap-x-3">
      {icon && (
        <div
          style={{
            background: "linear-gradient(90deg, #3C353B 0%, #785E57 100%)",
          }}
          className="lg:size-[72px] size-14 flex justify-center items-center rounded-full  p-4"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col xl:gap-y-2 gap-y-1  justify-center  flex-1">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-xl text-base text-[#212529] truncate">
            {title}
          </h3>
          {growth && (
            <h1
              className={cn(
                "flex",
                increase ? "text-[#165940]" : "text-[#5F1011]"
              )}
            >
              {increase ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
              {growth}
            </h1>
          )}
        </div>
        <p className="xl:text-3xl lg:text-2xl text-xl font-medium ">{amount}</p>
      </div>
    </div>
  );
}
