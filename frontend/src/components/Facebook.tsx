import React, { useState, useEffect } from "react";
import { Loader2, Image, Video, X, Check, AlertCircle } from "lucide-react";

// Define TypeScript types
type PostType = "photo" | "video" | "reel" | "carousel";

interface PostResponse {
  success: boolean;
  postId?: string;
  videoId?: string;
  reelId?: string;
  postUrl?: string;
  error?: string;
}

const Facebook: React.FC = () => {
  // State management
  const [postType, setPostType] = useState<PostType>("photo");
  const [caption, setCaption] = useState("");
  const [mediaLinks, setMediaLinks] = useState<string[]>([]);
  const [mediaLinkInput, setMediaLinkInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // When the post type changes, clear existing media links, error and response
  useEffect(() => {
    setMediaLinks([]);
    setError(null);
    setResponse(null);
    setMediaLinkInput("");
  }, [postType]);

  // Add a media link to the list
  const handleAddMediaLink = () => {
    const trimmedLink = mediaLinkInput.trim();
    if (!trimmedLink) return;
    setMediaLinks([...mediaLinks, trimmedLink]);
    setMediaLinkInput("");
  };

  // Remove a media link from the list
  const handleRemoveMediaLink = (index: number) => {
    const newLinks = [...mediaLinks];
    newLinks.splice(index, 1);
    setMediaLinks(newLinks);
  };

  // Submit the post to your backend (Lambda)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      // Validate inputs
      if (!caption.trim()) {
        throw new Error("Caption is required");
      }

      if (mediaLinks.length === 0) {
        throw new Error("Please add at least one media link");
      }

      if (
        (postType === "photo" || postType === "video" || postType === "reel") &&
        mediaLinks.length !== 1
      ) {
        throw new Error(`${postType} post requires exactly one media link`);
      }

      if (postType === "carousel" && mediaLinks.length < 2) {
        throw new Error("Carousel post requires at least 2 media links");
      }

      // Prepare the request payload
      const requestBody = {
        postType,
        mediaUrls: mediaLinks, // Directly using the links entered
        caption,
      };

      // Make the API call to your Lambda function
      const response = await fetch(
        "https://su5nbqyaxa.execute-api.ap-south-1.amazonaws.com/default/facebook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Render a preview of the media links added
  const renderMediaPreview = () => {
    if (mediaLinks.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {mediaLinks.map((link, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden bg-gray-200 h-48"
          >
            {/\.(mp4|mov|avi|wmv|flv|webm)$/i.test(link) ? (
              <video
                src={link}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={link}
                alt={`Media ${index}`}
                className="w-full h-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => handleRemoveMediaLink(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Render response message
  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
        <div className="flex items-center">
          <Check className="text-green-500 mr-2" size={20} />
          <h3 className="text-green-800 font-medium">
            Post Created Successfully!
          </h3>
        </div>
        <p className="mt-2 text-green-700">
          Your {postType} has been posted to Facebook.
        </p>
        {response.postUrl && (
          <a
            href={response.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View your post on Facebook
          </a>
        )}
      </div>
    );
  };

  // Render error message
  const renderError = () => {
    if (!error) return null;
    return (
      <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
        <div className="flex items-center">
          <AlertCircle className="text-red-500 mr-2" size={20} />
          <h3 className="text-red-800 font-medium">Error</h3>
        </div>
        <p className="mt-2 text-red-700">{error}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-2xl font-bold text-white">
            Facebook Content Publisher
          </h1>
          <p className="text-blue-100 mt-2">
            Create and publish content to your Facebook Page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Post Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["photo", "video", "reel", "carousel"] as PostType[]).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPostType(type)}
                    className={`
                      py-3 px-4 rounded-lg flex items-center justify-center capitalize font-medium text-sm
                      transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${
                        postType === type
                          ? "bg-blue-100 text-blue-700 border-2 border-blue-400"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }
                    `}
                  >
                    {type === "photo" && <Image size={18} className="mr-2" />}
                    {(type === "video" || type === "reel") && (
                      <Video size={18} className="mr-2" />
                    )}
                    {type === "carousel" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    )}
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Caption Input */}
          <div className="mb-6">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Caption
            </label>
            <textarea
              id="caption"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your post caption here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Media URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media URL{postType === "carousel" ? "s" : ""}
            </label>
            <div className="flex">
              <input
                type="text"
                value={mediaLinkInput}
                onChange={(e) => setMediaLinkInput(e.target.value)}
                placeholder="Enter media URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddMediaLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {postType === "photo" && "Enter a direct image URL"}
              {postType === "video" && "Enter a direct video URL"}
              {postType === "reel" && "Enter a direct video URL for your reel"}
              {postType === "carousel" &&
                "Enter direct image or video URLs (add at least 2)"}
            </p>
          </div>

          {/* Media Preview */}
          {renderMediaPreview()}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors flex items-center justify-center
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish to Facebook"
              )}
            </button>
          </div>

          {/* Response/Error Messages */}
          {renderResponse()}
          {renderError()}
        </form>
      </div>
    </div>
  );
};

export default Facebook;
