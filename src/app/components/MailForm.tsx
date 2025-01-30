"use client";

import { FC, useState, useEffect } from "react"; // Импортируем необходимые хуки из React
import { useForm, SubmitHandler } from "react-hook-form"; // Импортируем хуки для работы с формой
import { sendEmail } from "@/app/utils/send-email"; // Импортируем функцию отправки email
import Image from "next/image"; // Импортируем компонент Image из Next.js для работы с изображениями

export type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  cart: string;
};

const Contact: FC = () => {
  // Инициализация хуков для работы с формой и состояниями компонента
  const {
    register, // Для регистрации полей формы
    handleSubmit, // Для обработки отправки формы
    setValue, // Для установки значений полей
    formState: { isSubmitting }, // Для отслеживания состояния отправки формы
  } = useForm<FormData>();

  const [cart, setCart] = useState<[]>([]); // Состояние для хранения корзины
  const [isFormSubmitting, setIsFormSubmitting] = useState(false); // Состояние для отслеживания отправки формы
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для хранения сообщения об ошибке

  useEffect(() => {
    // Загружаем корзину из localStorage при монтировании компонента
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Ensure the cart is an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart); // Если корзина существует и корректно парсится, устанавливаем её в состояние
        } else {
          setCart([]); // Если данные не являются массивом, устанавливаем пустую корзину
        }
      } catch (error) {
        setCart([]); // В случае ошибки устанавливаем пустую корзину
      }
    }
  }, []);

  // Функция для добавления товара в корзину
  const addToCart = (product: any) => {
    // When adding a new product, set quantity to 1
    const updatedCart = [...cart];
    // Проверяем, есть ли товар в корзине
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity = 1; // Если товар есть, обновляем его количество
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Если товара нет, добавляем его в корзину с количеством 1
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Сохраняем обновленную корзину в localStorage
    setValue("cart", JSON.stringify(updatedCart)); // Обновляем значение корзины в форме
  };

  // Функция для обновления количества товара в корзине
  const updateQuantity = (index: number, change: number) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change); // Обновляем количество, но не меньше 1
    item.quantity = newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Сохраняем корзину в localStorage
    setValue("cart", JSON.stringify(updatedCart)); // Обновляем значение корзины в форме
  };

  // Функция для удаления товара из корзины
  const removeItemFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Фильтруем товар по индексу
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Сохраняем обновленную корзину в localStorage
    setValue("cart", JSON.stringify(updatedCart)); // Обновляем значение корзины в форме
  };

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isFormSubmitting) return; // Предотвращаем повторную отправку формы, если уже идет отправка
    setIsFormSubmitting(true); // Устанавливаем статус отправки формы

    data.cart = JSON.stringify(cart); // Добавляем корзину в данные формы

    try {
      await sendEmail(data); // Отправляем данные формы на сервер
      setIsModalOpen(true); // Показываем модальное окно после успешной отправки
    } catch (error) {
      setErrorMessage("Error submitting the form. Please try again later.");
    } finally {
      setIsFormSubmitting(false); // Завершаем процесс отправки
    }
  };

  // Рассчитываем общую стоимость товаров в корзине
  const totalPrice = cart.reduce(
    (total, item) => total + (Number(item.price) * Number(item.quantity) || 0),
    0
  );

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setErrorMessage(null); // Сбрасываем ошибку при закрытии модального окна
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Обработчик отправки формы
      className="mx-auto mb-4 p-6 bg-white rounded-lg shadow-lg ml-[14rem] mr-[14rem]"
    >
      <h1 className="text-2xl font-bold text-center mb-4">Contact Us</h1>

      {/* Поле для ввода имени */}
      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="name"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          {...register("name", { required: true })} // Регистрация поля для формы
        />
      </div>

      {/* Поле для ввода email */}
      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="email"
          className="mb-2 block text-base font-medium text-gray-700"
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

      {/* Поле для ввода телефонного номера */}
      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="phoneNumber"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="phoneNumber"
          placeholder="+375 (29) 123-45-67"
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          {...register("phoneNumber", { required: true })}
        />
      </div>

      {/* Поле для ввода сообщения */}
      <div className="mb-5 pl-2 pr-2">
        <label
          htmlFor="message"
          className="mb-2 block text-base font-medium text-gray-700"
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

      {/* Поле для отображения корзины */}
      <div className="mb-5 pl-2 pr-2">
        <label>Cart:</label>
        <textarea
          readOnly
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
          value={JSON.stringify(cart) || ""} // Отображаем корзину в виде строки JSON
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
                      onClick={() => updateQuantity(index, -1)} // Уменьшаем количество товара
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-1"
                      onClick={() => updateQuantity(index, 1)} // Увеличиваем количество товара
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-red-500 hover:text-red-700"
                    onClick={() => removeItemFromCart(index)} // Удаляем товар из корзины
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Отображаем общую стоимость */}
      <div className="pl-2 pr-2">
        <p className="mb-3 block text-base font-medium text-gray-700">
          Total: {totalPrice} руб.
        </p>
        <button
          type="submit"
          className="w-full shadow-form rounded-md bg-orange-500 hover:bg-orange-600 py-3 text-base font-semibold text-white outline-none"
          disabled={isSubmitting}
          data-testid="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
          {/* Изменяем текст кнопки в зависимости от состояния отправки */}
        </button>
      </div>

      {/* Модальное окно после успешной отправки формы */}
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
                onClick={closeModal} // Закрываем модальное окно
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Модальное окно для ошибки отправки */}
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
  );
};

export default Contact;
