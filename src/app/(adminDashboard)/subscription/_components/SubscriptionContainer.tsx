"use client";
import React from "react";
import { SubscriptionCard } from "./SubscriptionCard";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="space-y-3">
      <div className="flex justify-end py-2">
        <Link href={"/subscription/edit-subscription"}>  <Button size="large" variant="outlined" className="group" >Add New Subscription <ArrowRight size={20} className="group-hover:translate-x-2 duration-500" /></Button></Link>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2  gap-3">
        {subscriptionsData.map((item, index) => <SubscriptionCard
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          price={item.price}
          description={item.description}
          buttonText="EDIT"
        />)}
      </div>
    </div>
  );
}
