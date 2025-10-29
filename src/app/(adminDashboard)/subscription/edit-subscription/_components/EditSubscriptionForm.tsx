"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscriptionPlanSchema,
  type SubscriptionPlanFormData,
} from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import LastUpdates from "./LastUpdates";

export function EditSubscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = useSearchParams().get("edit");

  const form = useForm<SubscriptionPlanFormData>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      planName: "",
      cost: "0.00",
      features: "",
    },
  });

  async function onSubmit(data: SubscriptionPlanFormData) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Form submitted:", data);
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Plan updated successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="w-full  mx-auto p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-medium text-foreground mb-1">
          {isEdit ? "" : "Create"} Subscription Plan {isEdit ? "Editor" : ""}
        </h1>
        <p className="text-muted-foreground">
          Configure plan details, features, and pricing
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Plan Information Section */}
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">
              Plan Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="planName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter plan name"
                        {...field}
                        disabled={isSubmitting}
                        className="bg-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost (Enter 0 for free plans)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                          className="pl-7 bg-gray-200"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">

              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many members can add</FormLabel>
                    <FormControl>
                      <div className="relative">

                        <Input
                          placeholder="Enter how many members can add"
                          type="number"
                          min="0"
                          className=" bg-gray-200"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Features & Permissions Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Features & Permissions
            </h2>
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write here..."
                      className="min-h-40 resize-none bg-gray-200"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "linear-gradient(90deg, #3C353B 0%, #785E57 100%)",
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group"
          >
            {isSubmitting ? "Updating..." : "Update"}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-300" />
          </Button>
        </form>
      </Form>

      {
        isEdit && <LastUpdates />
      }
    </div>
  );
}
