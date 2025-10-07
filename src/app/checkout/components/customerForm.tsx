"use client";
import React from "react";
import { Coins, CreditCard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import AddAdress from "./addAddress";
import OrderSummary from "./orderSummary";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/http/api";
import { Customer } from "@/lib/types";

const CustomerForm = () => {
  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });

  return (
    <div className="flex container gap-6 mt-16">
      <Card className="w-3/5 border-none">
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                className="w-full"
                defaultValue={customer?.firstName}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                defaultValue={customer?.lastName}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                defaultValue={customer?.email}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Address</Label>
                  <AddAdress customerId="mock-id" />
                </div>

                <RadioGroup className="grid grid-cols-2 gap-6 mt-2">
                  {customer?.addresses.map((address) => {
                    return (
                      <Card className="p-6" key={address.text}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={address.text}
                            id={address.text}
                          />
                          <Label
                            htmlFor={address.text}
                            className="leading-normal"
                          >
                            {address.text}
                          </Label>
                        </div>
                      </Card>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Payment Mode</Label>
              <RadioGroup className="flex gap-6">
                <div className="w-36">
                  <RadioGroupItem
                    value={"card"}
                    id={"card"}
                    className="peer sr-only"
                    aria-label={"card"}
                  />
                  <Label
                    htmlFor={"card"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard size={"20"} />
                    <span className="ml-2">Card</span>
                  </Label>
                </div>
                <div className="w-36">
                  <RadioGroupItem
                    value={"cash"}
                    id={"cash"}
                    className="peer sr-only"
                    aria-label={"cash"}
                  />
                  <Label
                    htmlFor={"cash"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Coins size={"20"} />
                    <span className="ml-2 text-md">Cash</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="comment">Comment</Label>
              <Textarea />
            </div>
          </div>
        </CardContent>
      </Card>
      <OrderSummary />
    </div>
  );
};

export default CustomerForm;
