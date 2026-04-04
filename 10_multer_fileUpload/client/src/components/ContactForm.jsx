import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactForm = () => {
  // name, email, message, file
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors, isSubmitting },
  } = useForm();

  const onHandleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("file", data.file[0]);

      const response = await axios.post(
        import.meta.env.VITE_FORM_API,
        formData,
      );
      console.log(response.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Contact Us
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Your Name</label>
          <input
            {...register("name", { required: "Name is Required" })}
            type="text"
            placeholder="Enter your name"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-400 text-sm mt-1">
              {errors.name.message}
            </span>
          )}{" "}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Your Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-400 text-sm mt-1">
              {errors.email.message}
            </span>
          )}{" "}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Message</label>
          <textarea
            {...register("message", {})}
            rows="4"
            placeholder="Write your message..."
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.message && (
            <span className="text-red-400 text-sm mt-1">
              {errors.message.message}
            </span>
          )}{" "}
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Attach File</label>
          <input
            {...register("file", { required: "File is required" })}
            type="file"
            className="text-gray-300 file:mr-4 file:py-2 file:px-4 
        file:rounded-lg file:border-0 
        file:text-sm file:font-semibold 
        file:bg-blue-600 file:text-white 
        hover:file:bg-blue-700"
          />

          {errors.file && (
            <span className="text-red-400 text-sm mt-1">
              {errors.file.message}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
        >
          {isSubmitting ? "Sending" : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
