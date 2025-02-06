import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, phoneNumber, message, cart } = await request.json();

  // Логирование для проверки данных
  console.log({ email, name, phoneNumber, message, cart });

  // Преобразуем строку cart в массив, если это строка
  let cartItemsArray;
  try {
    cartItemsArray = typeof cart === "string" ? JSON.parse(cart) : cart;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid cart data format" },
      { status: 400 }
    );
  }

  // Проверка, что cartItemsArray - это массив
  if (!Array.isArray(cartItemsArray)) {
    return NextResponse.json(
      { error: "Cart data is not an array" },
      { status: 400 }
    );
  }

  // Рассчитываем общую сумму и определяем валюту
  let totalPrice = 0;
  let currency = ""; // Переменная для хранения валюты

  cartItemsArray.forEach((item) => {
    totalPrice += item.price * item.quantity;
    if (!currency && item.currency) {
      currency = item.currency; // Берем валюту из первого товара
    }
  });

  // Настройка транспорта для отправки письма
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  // Форматируем cart как таблицу для HTML письма
  const cartItems = cartItemsArray
    .map(
      (item: {
        productName: string;
        quantity: number;
        price: number;
        currency: string;
      }) => {
        // Если цена товара 0, выводим сообщение "Товара нет в наличии"
        const itemPrice =
          item.price === 0
            ? "Товара нет в наличии"
            : `${item.price.toFixed(2)} ${item.currency || ""}`;
        return ` 
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.productName}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${item.quantity}</td> 
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${itemPrice}</td>
        </tr>
      `;
      }
    )
    .join(" ");

  // HTML шаблон письма
  const htmlTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #ff5733;
            font-size: 24px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
          }
          .cart-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .cart-table th, .cart-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }
          .cart-table th {
            background-color: #f9f9f9;
            color: #ff5733;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #aaa;
          }
          .total-price {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>

          <h2 style="color: #ff5733;">Cart Details:</h2>
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems}
            </tbody>
          </table>

          <!-- Total Price -->
          <div class="total-price">
            <p>Total: ${totalPrice.toFixed(2)} ${currency}</p>
          </div>

          <div class="footer">
            <p>Thank you for your message. We'll get back to you shortly!</p>
            <p>&copy; ${new Date().getFullYear()} LSK GROUP. All Rights Reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Настройки письма
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `Request from ${name} (${email})`,
    html: htmlTemplate, // Отправляем HTML письмо
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
