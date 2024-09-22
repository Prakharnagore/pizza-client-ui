"use client";

import React, { useState, useEffect } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const ToppingList = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=10`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
    };
    fetchData();
  }, []);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id
    );
    if (isAlreadyExists) {
      setSelectedToppings((prev) =>
        prev.filter((elm: Topping) => elm.id !== topping.id)
      );
      return;
    }
    setSelectedToppings((prev: Topping[]) => [...prev, topping]);
  };

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => {
          return (
            <ToppingCard
              key={topping.id}
              topping={topping}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
