import { useState } from "react";
import { toast } from "react-toastify";

const AssetsModal = ({ assets, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("image");
  
    const handleCopy = (link) => {
      navigator.clipboard.writeText(link);
      toast.success("Link copied!");
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded shadow-lg w-3/4 max-h-3/4 overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Assets</h2>
            <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
              ✖
            </button>
          </div>
  
          {/* Tabs */}
          <div className="flex border-b">
            {["image", "audio", "video", "url"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 p-2 ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
  
          {/* Tab Content */}
          <div className="p-4">
            {assets[activeTab]?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {assets[activeTab].map((link, index) => (
                  <div key={index} className="border rounded p-2">
                    {activeTab === "image" && (
                      <img src={link} alt={`Asset ${index}`} className="w-full h-32 object-cover rounded" />
                    )}
                    {activeTab === "audio" && (
                      <audio controls className="w-full">
                        <source src={link} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {activeTab === "video" && (
                      <video controls className="w-full h-32 object-cover">
                        <source src={link} type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                    )}
                    {activeTab === "url" && (
                      <div className="text-sm text-blue-500 truncate">{link}</div>
                    )}
                    <button
                      className="bg-blue-500 text-white text-sm mt-2 px-4 py-1 rounded w-full"
                      onClick={() => handleCopy(link)}
                    >
                      Copy Link
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No assets available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default AssetsModal
  