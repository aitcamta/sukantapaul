"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/Store";
const SupportChat = () => {
  const router = useRouter();
  const { USER, unreadRequests } = useGlobalContext();
  const { isAdmin } = USER;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isAdmin && (
        <div className="flex items-start justify-center bg-gray-800 rounded-full shadow-lg">
          <button
            onClick={() => router.push("/requests")}
            className=" text-white rounded-full p-2 shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
          >
            <i className="bi bi-chat text-2xl"></i>
            <span className="text-white p-1 -mt-4">{unreadRequests}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
