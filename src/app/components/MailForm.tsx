"use client";

import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-email";
import Image from "next/image";

export type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]);
        }
      } catch (error) {
        setCart([]);
      }
    }
  }, []);

  const addToCart = (product: any) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity = 1; // Default quantity to 1 if already in cart
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setValue("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index: number, value: string) => {
    const updatedCart = [...cart];
    const newQuantity = Math.max(1, Number(value)); // Ensure the quantity is at least 1
    updatedCart[index].quantity = newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setValue("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (index: number, change: number) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change);
    item.quantity = newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setValue("cart", JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setValue("cart", JSON.stringify(updatedCart));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isFormSubmitting) return;
    setIsFormSubmitting(true);

    data.cart = JSON.stringify(cart);

    try {
      await sendEmail(data);
      setIsModalOpen(true);
    } catch (error) {
      setErrorMessage("Error submitting the form. Please try again later.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (Number(item.price) * Number(item.quantity) || 0),
    0
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <div className="bg-[#e4e4e4]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-6 pb-6 mb-4 mx-auto pl-4 pr-4 sm:mr-4 sm:ml-4 lg:ml-32 lg:mr-32 mt-4 shadow-xl rounded-lg px-4 bg-white"
      >
        <h1 className="text-4xl font-regular text-center mb-4">Contact Us</h1>

        {/* Form fields */}
        <div className="mb-5 pl-2 pr-2">
          <label
            htmlFor="name"
            className="mb-2 block text-xl font-sans text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-md border-2 border-zinc-500 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:border-2 focus:border-orange-500"
            {...register("name", { required: true })}
          />
        </div>

        <div className="mb-5 pl-2 pr-2">
          <label
            htmlFor="email"
            className="mb-2 block text-xl font-sans text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full rounded-md border-2 border-zinc-500 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:border-2 focus:border-orange-500"
            {...register("email", { required: true })}
          />
        </div>

        <div className="mb-5 pl-2 pr-2">
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-xl font-sans text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="phoneNumber"
            placeholder="+375 (29) 123-45-67"
            className="w-full rounded-md border-2 border-zinc-500 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:border-2 focus:border-orange-500"
            {...register("phoneNumber", { required: true })}
          />
        </div>

        <div className="mb-5 pl-2 pr-2">
          <label
            htmlFor="message"
            className="mb-2 block text-xl font-sans text-gray-700"
          >
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your message"
            className="w-full rounded-md border-2 border-zinc-500 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:border-2 focus:border-orange-500"
            {...register("message", { required: true })}
          ></textarea>
        </div>

        {/* Cart display */}
        <div className="mb-5 pl-2 pr-2">
          <label className="mb-2 block text-xl font-sans text-gray-700">
            Cart:
          </label>
          <textarea
            readOnly
            className="w-full rounded-md border-2 border-zinc-500 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:border-2 focus:border-orange-500"
            value={JSON.stringify(cart) || ""}
            {...register("cart", { required: true })}
          ></textarea>
          {cart.length > 0 && (
            <div>
              <h2 className="text-xl font-sans mt-4">Your Order:</h2>
              <div className="grid gap-4 mt-4">
                {cart.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg drop-shadow-xl max-w-full overflow-hidden"
                    >
                      <h3 className="text-xl font-sans">{item.productName}</h3>
                      <div className="flex flex-col md:flex-row justify-between">
                        {item.imageURL && (
                          <div className="w-full md:w-1/3 flex justify-center">
                            <Image
                              src={item.imageURL}
                              alt={item.productName || "Product Image"}
                              width={100}
                              height={100}
                              className="mt-2 mb-4 object-cover w-full h-auto rounded-lg max-w-[150px] md:max-w-none"
                            />
                          </div>
                        )}
                        <div className="w-full md:w-2/3 ml-0 md:ml-4">
                          <p className="mt-4 text-l font-semiBold">Описание товара:</p>
                          <p className="mt-4 text-sm font-sans text-gray-600 w-full break-words overflow-hidden text-ellipsis">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold font-sans mt-4">
                        Price: {item?.price || "Please check"}{" "}
                        {item?.currency || ""}
                      </p>
                      {/* Quantity controls */}
                      <div className="flex flex-row justify-between">
                        <div className="flex items-center mt-2">
                          <button
                            type="button"
                            className="text-white bg-orange-500 hover:bg-orange-600 rounded-md px-3 py-1"
                            onClick={() => updateQuantity(index, -1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                            className="mx-4 w-10 text-center border-2 border-zinc-500 rounded-md appearance-none"
                            min="1"
                          />
                          <button
                            type="button"
                            className="text-white bg-orange-500 hover:bg-orange-600 rounded-md px-3 py-1"
                            onClick={() => updateQuantity(index, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="mt-3 bg-red-500 rounded-md px-3 py-1 text-white hover:bg-red-600"
                          onClick={() => removeItemFromCart(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Total Price */}
        <div className="pl-2 pr-2">
          <div className="flex justify-between">
            <h2 className="mb-3 text-2xl font-bold text-gray-700">Total:</h2>
            <p>{totalPrice}</p>
          </div>
          <button
            type="submit"
            className="w-full shadow-form rounded-md bg-orange-500 hover:bg-orange-600 py-3 text-base font-semibold text-white outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Modal Windows */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 shadow-black drop-shadow-2xl">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-black drop-shadow-2xl">
              <h2 className="text-2xl font-semibold text-center">Success!</h2>
              <p className="mt-2 text-center text-gray-600">
                Your form has been submitted successfully. Thank you!
              </p>
              <div className="mt-4 text-center">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 shadow-black drop-shadow-2xl">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-black drop-shadow-2xl">
              <h2 className="text-2xl font-semibold text-center text-red-500">
                Error!
              </h2>
              <p className="mt-2 text-center text-gray-600">{errorMessage}</p>
              <div className="mt-4 text-center">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;

