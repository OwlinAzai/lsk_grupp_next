"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full px-4 bg-blue-500 py-2 text-white font-medium rounded-md"
    >
      {pending ? "Sending email..." : "Send mail"}
    </button>
  );
}

export default function SendMail() {
  async function sendMailAction(formData: FormData) {
    "use server";
    console.log("Name:", formData.get("name"));
    console.log("Email:", formData.get("email"));
    console.log("Subject:", formData.get("subject"));
    console.log("Message:", formData.get("message"));

    return { message: "all good" };
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <form action={sendMailAction} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
