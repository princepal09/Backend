import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../services/apiConnector";
import { END_POINTS } from "../services/api";
import Spinner from "./Spinner";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [data, setData] = useState("");

  const fetchData = async (data) => {
    try {
      const response = await apiConnector("POST", END_POINTS.OLLAMA_API, {
        message: data.prompt,
      });

      console.log("API Response:", response.data);
      setData(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitHandler = async (data) => {
    await fetchData(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      {/* Main Container */}
      <div className="w-full max-w-3xl bg-gray-950 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-4 text-center">
          <h1 className="text-2xl font-semibold text-white">Gemini Chat App</h1>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <textarea
              {...register("prompt", { required: "Prompt is required" })}
              rows={6}
              name="prompt"
              placeholder="Ask something..."
              className="w-full  p-4 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
            {errors.prompt && (
              <p className="text-red-500 text-sm">{errors.prompt.message}</p>
            )}

            <button
              type="submit"
              className="self-end px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Response Section */}
          <div className="bg-gray-900 border overflow-y-scroll border-gray-700 rounded-lg p-4 h-75 text-gray-300">
            <p className="text-sm text-gray-400 mb-2">Response:</p>
            {/* Response will appear here */}
            {isSubmitting ? <Spinner /> : <ReactMarkdown>{data}</ReactMarkdown>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
