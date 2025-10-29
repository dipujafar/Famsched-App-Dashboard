"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  buttonText?: string
}

export function SubscriptionCard({
  title,
  subtitle,
  price,
  description,
  buttonText = "EDIT"
}: PricingCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className=" text-muted-foreground">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Section */}
        <div
          style={{
            background: "linear-gradient(90deg, #3C353B 0%, #785E57 100%)",
          }}
          className="text-primary-foreground rounded-lg py-5 px-4 text-center"
        >
          <div className="text-4xl font-bold">{price}</div>
        </div>

        {/* Description */}
        <p className="mb-3  leading-relaxed text-[#5E5E60]">{description}</p>

        {/* Button */}
        <Link href={`/subscription/edit-subscription?edit=1`}>
          <Button
            variant="outline"
            className="w-full bg-transparent group py-4 mt-4 border border-main-color"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-300" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
