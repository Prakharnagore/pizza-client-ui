"use client";

import { increment } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import Link from "next/link";

const CartCounter = () => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <>
      <div className="relative">
        <Link href={"/cart"}>
          <ShoppingBasket className="hover:text-primary" />
        </Link>
        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          3
        </span>
      </div>
      <button onClick={handleIncrement}>Increment</button>
    </>
  );
};

export default CartCounter;
