"use client";
import React from "react";
import { SubscriptionCard } from "./SubscriptionCard";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetSubscriptionQuery } from "@/redux/api/subscriptionApi";

const subscriptionsData = [
  {
    title: "Basic Plan",
    subtitle: "For 20 members subscription plan",
    price: "$9.00",
    description:
      "Access core career tools, AI assistance, scripts, and job search resources — all for free.",
    buttonText: "EDIT",
  },
  {
    title: "Premium Plan",
    subtitle: "For 50 members subscription plan",
    price: "$19.00",
    description:
      "Access core career tools, AI assistance, scripts, and job search resources — all for free.",
    buttonText: "EDIT",
  }
]

export default function SubscriptionContainer() {
  const { data } = useGetSubscriptionQuery({ limit: 999 });


  return (
    <div className="space-y-3">
      <div className="flex justify-end py-2">
        <Link href={"/subscription/edit-subscription"}>  <Button size="large" variant="outlined" className="group" >Add New Subscription <ArrowRight size={20} className="group-hover:translate-x-2 duration-500" /></Button></Link>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2  gap-3">
        {data?.data?.data?.map((item: any, index: number) => <SubscriptionCard
          key={index}
          id={item?._id}
          title={item?.title}
          subtitle={`For ${item?.maxMembers} members subscription plan`}
          price={`$${item?.price}`}
          description={item?.description}
          buttonText="EDIT"
        />)}
      </div>
    </div>
  );
}
