import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React from "react";

const OrderSummary = () => {
  // Mock data for UI display
  const subTotal = 450;
  const taxesAmount = 81;
  const deliveryCharges = 100;
  const discountAmount = 50;
  const grandTotal = 581;
  const originalTotal = 631;
  const hasDiscount = true;

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹{taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹{deliveryCharges}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold flex flex-col items-end">
            <span className={hasDiscount ? "line-through text-gray-400" : ""}>
              ₹{originalTotal}
            </span>
            {hasDiscount ? (
              <span className="text-green-700">₹{grandTotal}</span>
            ) : null}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Input
            id="coupon"
            name="code"
            type="text"
            className="w-full"
            placeholder="Coupon code"
          />
          <Button variant={"outline"}>Apply</Button>
        </div>

        <div className="text-right mt-6">
          <Button>
            <span>Place order</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
