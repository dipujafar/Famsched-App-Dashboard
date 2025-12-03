"use client";
import { useEffect } from "react";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import LastUpdates from "./LastUpdates";
import { useCreateSubscriptionMutation, useSingleSubscriptionQuery, useUpdateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { Error_Modal } from "@/utils/modals";
import { toast } from "sonner";
import EditFromSkeleton from "../Skeleton/EditFromSkeleton";
import { groupHistoryByDate } from "@/utils/groupHistoryByDate";

export function EditSubscriptionForm() {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const isEdit = useSearchParams().get("edit");
  const { data, isLoading: singleDataLoading } = useSingleSubscriptionQuery(isEdit, { skip: !isEdit });
  const [updateSubscription, { isLoading: updateLoading }] = useUpdateSubscriptionMutation();

  console.log(data?.data?.updateHistory);

  const historyData = groupHistoryByDate(data?.data?.updateHistory) || [];
  
  console.log(historyData);



  const form = useForm<SubscriptionPlanFormData>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      planName: data?.data?.title,
      cost: (data?.data?.price)?.toString(),
      features: data?.data?.description,
      members: (data?.data?.maxMembers)?.toString(),
    },
  });

  useEffect(() => {
    form.setValue("planName", data?.data?.title);
    form.setValue("cost", (data?.data?.price)?.toString());
    form.setValue("features", data?.data?.description);
    form.setValue("members", (data?.data?.maxMembers)?.toString());
  }, [data?.data]);

  if (singleDataLoading && isEdit) return <EditFromSkeleton />




  async function onSubmit(data: SubscriptionPlanFormData) {
    const formattedData = {
      price: data?.cost,
      title: data?.planName,
      maxMembers: data?.members,
      description: data?.features
    }

    try {
      if (isEdit) {
        await updateSubscription({ id: isEdit, data: formattedData }).unwrap();
        toast.success("Successfully updated subscription plan", {
          duration: 3000
        });
        form.reset();
      } else {
        await createSubscription(formattedData).unwrap();
        toast.success("Successfully created subscription plan", {
          duration: 3000
        });
      }

      form.reset();
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
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
                        className="bg-gray-200 py-5"
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
                          className="pl-7 bg-gray-200 py-5"
                          {...field}
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
                          className=" bg-gray-200 py-5"
                          {...field}
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
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || updateLoading}

            style={{
              background: "linear-gradient(90deg, #3C353B 0%, #785E57 100%)",
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group"
          >
            {isEdit ? "Update" : "Submit"} {(isLoading || updateLoading) && <Loader2 className="animate-spin" />}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-300" />
          </Button>
        </form>
      </Form>

      {
        isEdit && <LastUpdates data={historyData} />
      }
    </div>
  );
}
