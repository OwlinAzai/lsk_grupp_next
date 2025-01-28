"use client";

import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-email";
import Image from "next/image";

export type FormData = {
  name: string;
  email: string;
  message: string;
  cart: string;
};

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const [cart, setCart] = useState<any[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Ensure the cart is an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]); // Fallback to empty array if data is corrupted
        }
      } catch (error) {
        setCart([]); // Fallback to empty array in case of JSON parse error
      }
    }
  }, []);

  const updateQuantity = (index: number, change: number) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    // Ensure quantity is a valid number and update it
    const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change); // Ensure it's a number

    // Update the quantity of the item
    item.quantity = newQuantity;

    // Update the state and localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the cart value in the form state
    setValue("cart", JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

    // Update the cart value in the form state
    setValue("cart", JSON.stringify(updatedCart));
  };

  const onSubmit = async (data: FormData) => {
    // Prevent multiple submissions
    if (isFormSubmitting) return;
    setIsFormSubmitting(true);

    // Ensure the cart data is up to date when submitting
    data.cart = JSON.stringify(cart);

    try {
      await sendEmail(data);
      alert("Form submitted successfully");
    } catch (error) {
      alert("Error submitting the form");
    } finally {
      setIsFormSubmitting(false); // Reset the form submission flag
    }
  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + (Number(item.price) * Number(item.quantity) || 0),
    0
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mx-auto p-6 bg-white rounded-lg shadow-lg ml-[14rem] mr-[14rem]"
    >
      <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>

      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          {...register("name", { required: true })}
        />
      </div>

      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          {...register("email", { required: true })}
        />
      </div>

      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="message"
          className="mb-3 block text-base font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          {...register("message", { required: true })}
        ></textarea>
      </div>

      <div className="mb-5 pl-2 pr-2">
        <label>Cart:</label>
        <textarea
          readOnly
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          value={JSON.stringify(cart) || ""}
          {...register("cart", { required: true })}
        ></textarea>

        {cart.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-4">Your Order:</h2>
            <div className="grid gap-4 mt-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="mt-2 mb-4"
                  />
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="font-semibold">Price: {item.price} руб.</p>
                  <div className="flex items-center mt-2">
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-1"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-1"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-red-500 hover:text-red-700"
                    onClick={() => removeItemFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pl-2 pr-2">
        <p className="mb-3 block text-base font-medium text-gray-700">
          Total: {totalPrice} руб.
        </p>
        <button
          type="submit"
          className="w-full shadow-form rounded-md bg-orange-500 hover:bg-orange-600 py-3 text-base font-semibold text-white outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Contact;
