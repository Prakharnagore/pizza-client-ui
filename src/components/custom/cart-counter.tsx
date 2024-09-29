"use client";

import { ShoppingBasket } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";

const CartCounter = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <>
      <div className="relative">
        <Link href={"/cart"}>
          <ShoppingBasket className="hover:text-primary" />
        </Link>
        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          {cartItems.length}
        </span>
      </div>
    </>
  );
};

export default CartCounter;
