// import { useState } from "react";

// interface FormData {
//   imageUrl: string;
//   caption: string;
//   userTags?: string;
// }

// interface SubmitResult {
//   success: boolean;
//   publishedPostId?: string;
//   error?: string;
// }

// const Instagram = () => {
//   const [formData, setFormData] = useState<FormData>({
//     imageUrl: "",
//     caption: "",
//     userTags: "",
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [result, setResult] = useState<SubmitResult | null>(null);
//   const [showUserTagsHelp, setShowUserTagsHelp] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setResult(null);

//     try {
//       // Validate user tags if provided
//       if (formData.userTags) {
//         try {
//           const parsedTags = JSON.parse(formData.userTags);
//           if (!Array.isArray(parsedTags)) {
//             throw new Error("User tags must be an array");
//           }
//           // Check each tag has required fields
//           parsedTags.forEach((tag, index) => {
//             if (!tag.username) {
//               throw new Error(`Tag at index ${index} is missing username`);
//             }
//             if (typeof tag.x !== "number" || tag.x < 0 || tag.x > 1) {
//               throw new Error(
//                 `Tag at index ${index} has invalid x coordinate (must be between 0 and 1)`
//               );
//             }
//             if (typeof tag.y !== "number" || tag.y < 0 || tag.y > 1) {
//               throw new Error(
//                 `Tag at index ${index} has invalid y coordinate (must be between 0 and 1)`
//               );
//             }
//           });
//         } catch (error) {
//           setResult({
//             success: false,
//             error: `Invalid user tags format: ${
//               error instanceof Error ? error.message : String(error)
//             }`,
//           });
//           setIsLoading(false);
//           return;
//         }
//       }

//       // Replace with your actual API endpoint
//       const API_ENDPOINT =
//         import.meta.env.VITE_API_ENDPOINT ||
//         "https://su5nbqyaxa.execute-api.ap-south-1.amazonaws.com/default/instagram/createPost";

//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         mode: "cors",
//         credentials: "same-origin",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to create post");
//       }

//       setResult({
//         success: true,
//         publishedPostId: data.publishedPostId,
//       });

//       // Reset form on success
//       setFormData({
//         imageUrl: "",
//         caption: "",
//         userTags: "",
//       });
//     } catch (error) {
//       console.error("Error posting to Instagram:", error);
//       setResult({
//         success: false,
//         error:
//           error instanceof Error ? error.message : "An unknown error occurred",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleUserTagsHelp = () => {
//     setShowUserTagsHelp(!showUserTagsHelp);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Post to Instagram
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="imageUrl"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Image URL
//           </label>
//           <input
//             type="url"
//             id="imageUrl"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             placeholder="https://example.com/your-image.jpg"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="caption"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Caption
//           </label>
//           <textarea
//             id="caption"
//             name="caption"
//             value={formData.caption}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Write your caption here..."
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <div className="flex justify-between items-center">
//             <label
//               htmlFor="userTags"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Tag Users (JSON format)
//             </label>
//             <button
//               type="button"
//               onClick={toggleUserTagsHelp}
//               className="text-xs text-indigo-600 hover:text-indigo-800"
//             >
//               {showUserTagsHelp ? "Hide Help" : "Show Help"}
//             </button>
//           </div>

//           {showUserTagsHelp && (
//             <div className="mb-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
//               <p>
//                 Format must be a JSON array of objects with username, x, and y
//                 properties:
//               </p>
//               <pre className="mt-1 bg-gray-100 p-1 rounded overflow-x-auto">
//                 {`[
//   {
//     "username": "kevinhart4real",
//     "x": 0.5,
//     "y": 0.8
//   },
//   {
//     "username": "therock",
//     "x": 0.3,
//     "y": 0.2
//   }
// ]`}
//               </pre>
//               <p className="mt-1">
//                 Note: x and y values must be between 0 and 1, where (0,0) is the
//                 top-left of the image.
//               </p>
//             </div>
//           )}

//           <input
//             type="text"
//             id="userTags"
//             name="userTags"
//             value={formData.userTags || ""}
//             onChange={handleChange}
//             placeholder='e.g. [{"username":"kevinhart4real", "x":0.5, "y":0.8}]'
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//             isLoading
//               ? "bg-indigo-400 cursor-not-allowed"
//               : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           }`}
//         >
//           {isLoading ? "Posting..." : "Post to Instagram"}
//         </button>
//       </form>

//       {result && (
//         <div
//           className={`mt-4 p-3 rounded-md ${
//             result.success
//               ? "bg-green-50 text-green-800"
//               : "bg-red-50 text-red-800"
//           }`}
//         >
//           {result.success ? (
//             <div>
//               <p className="font-medium">Post published successfully!</p>
//               <p className="text-sm">Post ID: {result.publishedPostId}</p>
//             </div>
//           ) : (
//             <p className="font-medium">Error: {result.error}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Instagram;

import { useState } from "react";
import { Camera, Film, Image, Images, Play, Info } from "lucide-react";

// Post types supported by the application
type PostType = "image" | "carousel" | "reel" | "story";

interface FormData {
  mediaUrls: string[];
  caption: string;
  userTags?: string;
  postType: PostType;
}

interface SubmitResult {
  success: boolean;
  publishedPostId?: string;
  error?: string;
}

const Instagram = () => {
  const [formData, setFormData] = useState<FormData>({
    mediaUrls: [""],
    caption: "",
    userTags: "",
    postType: "image",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [showUserTagsHelp, setShowUserTagsHelp] = useState<boolean>(false);

  const handleMediaUrlChange = (index: number, value: string) => {
    const updatedUrls = [...formData.mediaUrls];
    updatedUrls[index] = value;
    setFormData((prev) => ({
      ...prev,
      mediaUrls: updatedUrls,
    }));
  };

  const handleAddMediaUrl = () => {
    if (formData.postType === "carousel") {
      setFormData((prev) => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ""],
      }));
    }
  };

  const handleRemoveMediaUrl = (index: number) => {
    if (formData.mediaUrls.length > 1) {
      const updatedUrls = formData.mediaUrls.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        mediaUrls: updatedUrls,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostTypeChange = (type: PostType) => {
    // Reset to single media URL if switching from carousel to other types
    const mediaUrls =
      type === "carousel" ? formData.mediaUrls : [formData.mediaUrls[0] || ""];

    setFormData((prev) => ({
      ...prev,
      postType: type,
      mediaUrls,
    }));
  };

  const toggleUserTagsHelp = () => {
    setShowUserTagsHelp(!showUserTagsHelp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      // Validate user tags if provided
      if (formData.userTags) {
        try {
          const parsedTags = JSON.parse(formData.userTags);
          if (!Array.isArray(parsedTags)) {
            throw new Error("User tags must be an array");
          }
          // Check each tag has required fields
          parsedTags.forEach((tag, index) => {
            if (!tag.username) {
              throw new Error(`Tag at index ${index} is missing username`);
            }
            if (typeof tag.x !== "number" || tag.x < 0 || tag.x > 1) {
              throw new Error(
                `Tag at index ${index} has invalid x coordinate (must be between 0 and 1)`
              );
            }
            if (typeof tag.y !== "number" || tag.y < 0 || tag.y > 1) {
              throw new Error(
                `Tag at index ${index} has invalid y coordinate (must be between 0 and 1)`
              );
            }
          });
        } catch (error) {
          setResult({
            success: false,
            error: `Invalid user tags format: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
          setIsLoading(false);
          return;
        }
      }

      // Replace with your actual API endpoint
      const API_ENDPOINT =
        import.meta.env.VITE_API_ENDPOINT ||
        "https://su5nbqyaxa.execute-api.ap-south-1.amazonaws.com/default/instagram/createPost";

      const requestData = {
        mediaUrls: formData.mediaUrls.filter((url) => url.trim() !== ""),
        caption: formData.caption,
        userTags: formData.userTags,
        postType: formData.postType,
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        mode: "cors",
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setResult({
        success: true,
        publishedPostId: data.publishedPostId,
      });

      // Reset form on success
      setFormData({
        mediaUrls: [""],
        caption: "",
        userTags: "",
        postType: "image",
      });
    } catch (error) {
      console.error("Error posting to Instagram:", error);
      setResult({
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get placeholder text based on post type
  const getUrlPlaceholder = () => {
    switch (formData.postType) {
      case "reel":
        return "https://example.com/your-reel.mp4";
      case "story":
        return "https://example.com/your-story-media.jpg";
      case "carousel":
        return "https://example.com/your-carousel-image.jpg";
      default:
        return "https://example.com/your-image.jpg";
    }
  };

  // Get input type based on post type

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Post to Instagram
      </h2>

      {/* Post Type Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => handlePostTypeChange("image")}
          className={`flex items-center gap-1 py-2 px-3 rounded-md text-sm ${
            formData.postType === "image"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <Image size={16} /> Image
        </button>

        <button
          type="button"
          onClick={() => handlePostTypeChange("carousel")}
          className={`flex items-center gap-1 py-2 px-3 rounded-md text-sm ${
            formData.postType === "carousel"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <Images size={16} /> Carousel
        </button>
        <button
          type="button"
          onClick={() => handlePostTypeChange("reel")}
          className={`flex items-center gap-1 py-2 px-3 rounded-md text-sm ${
            formData.postType === "reel"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <Film size={16} /> Reel
        </button>
        <button
          type="button"
          onClick={() => handlePostTypeChange("story")}
          className={`flex items-center gap-1 py-2 px-3 rounded-md text-sm ${
            formData.postType === "story"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <Camera size={16} /> Story
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Media URL fields */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.postType === "carousel" ? "Media URLs" : "Media URL"}
          </label>

          {formData.mediaUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                placeholder={getUrlPlaceholder()}
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />

              {formData.postType === "carousel" && (
                <button
                  type="button"
                  onClick={() => handleRemoveMediaUrl(index)}
                  disabled={formData.mediaUrls.length === 1}
                  className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  &times;
                </button>
              )}
            </div>
          ))}

          {formData.postType === "carousel" && (
            <button
              type="button"
              onClick={handleAddMediaUrl}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
            >
              <span className="mr-1">+</span> Add another media
            </button>
          )}

          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Info size={14} />
            {formData.postType === "image" && "JPEG, PNG formats supported"}
            {formData.postType === "reel" &&
              "MP4, MOV formats supported (max 90s)"}
            {formData.postType === "story" &&
              "Images or short videos (max 15s)"}
            {formData.postType === "carousel" &&
              "Mix of images and videos (up to 10)"}
          </div>
        </div>

        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            rows={4}
            placeholder="Write your caption here..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label
              htmlFor="userTags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tag Users (JSON format)
            </label>
            <button
              type="button"
              onClick={toggleUserTagsHelp}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              {showUserTagsHelp ? "Hide Help" : "Show Help"}
            </button>
          </div>

          {showUserTagsHelp && (
            <div className="mb-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
              <p>
                Format must be a JSON array of objects with username, x, and y
                properties:
              </p>
              <pre className="mt-1 bg-gray-100 p-1 rounded overflow-x-auto">
                {`[
  {
    "username": "kevinhart4real",
    "x": 0.5,
    "y": 0.8
  },
  {
    "username": "therock",
    "x": 0.3,
    "y": 0.2
  }
]`}
              </pre>
              <p className="mt-1">
                Note: x and y values must be between 0 and 1, where (0,0) is the
                top-left of the image.
              </p>
            </div>
          )}

          <input
            type="text"
            id="userTags"
            name="userTags"
            value={formData.userTags || ""}
            onChange={handleChange}
            placeholder='e.g. [{"username":"kevinhart4real", "x":0.5, "y":0.8}]'
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white flex items-center justify-center gap-2 ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin">⟳</span> Posting...
            </>
          ) : (
            <>
              <Play size={16} /> Post to Instagram
            </>
          )}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded-md ${
            result.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {result.success ? (
            <div>
              <p className="font-medium">Post published successfully!</p>
              <p className="text-sm">Post ID: {result.publishedPostId}</p>
            </div>
          ) : (
            <p className="font-medium">Error: {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Instagram;
