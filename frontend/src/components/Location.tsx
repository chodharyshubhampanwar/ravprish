// import { useState } from "react";

// interface FormData {
//   imageUrl: string;
//   caption: string;
//   userTags?: string;
//   locationId?: string;
// }

// interface SubmitResult {
//   success: boolean;
//   publishedPostId?: string;
//   error?: string;
// }

// interface LocationSearchResult {
//   id: string;
//   name: string;
//   location?: {
//     city?: string;
//     country?: string;
//     street?: string;
//   };
// }

// const Instagram = () => {
//   const [formData, setFormData] = useState<FormData>({
//     imageUrl: "",
//     caption: "",
//     userTags: "",
//     locationId: "",
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [result, setResult] = useState<SubmitResult | null>(null);
//   const [isSearchingLocation, setIsSearchingLocation] =
//     useState<boolean>(false);
//   const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");
//   const [locationResults, setLocationResults] = useState<
//     LocationSearchResult[]
//   >([]);
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
//             error: `Invalid user tags format: ${error.message}`,
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
//         locationId: "",
//       });
//       setLocationResults([]);
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

//   const searchLocation = async () => {
//     if (!locationSearchTerm || locationSearchTerm.length < 3) {
//       setLocationResults([]);
//       return;
//     }

//     setIsSearchingLocation(true);

//     try {
//       // This is a placeholder. In a real app, you would implement a proxy endpoint
//       // that calls the Facebook Graph API with your access token
//       alert(
//         "In a real implementation, you would need to create a backend endpoint that searches for locations using the Facebook Graph API. For now, you'll need to manually find and enter location IDs."
//       );

//       /* Actual implementation would look something like this:
//       const response = await fetch('/api/search-facebook-pages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: locationSearchTerm })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setLocationResults(data.data || []);
//       }
//       */

//       // For demonstration, we'll just show a mock result
//       setLocationResults([
//         {
//           id: "309968765748101",
//           name: "Facebook HQ",
//           location: {
//             city: "Menlo Park",
//             country: "United States",
//             street: "1 Hacker Way",
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error("Error searching for locations:", error);
//     } finally {
//       setIsSearchingLocation(false);
//     }
//   };

//   const selectLocation = (location: LocationSearchResult) => {
//     setFormData((prev) => ({
//       ...prev,
//       locationId: location.id,
//     }));
//     setLocationResults([]);
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

//         <div>
//           <label
//             htmlFor="locationSearch"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Search Location
//           </label>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               id="locationSearch"
//               value={locationSearchTerm}
//               onChange={(e) => setLocationSearchTerm(e.target.value)}
//               placeholder="Search for a place..."
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <button
//               type="button"
//               onClick={searchLocation}
//               disabled={isSearchingLocation}
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
//             >
//               {isSearchingLocation ? "..." : "Search"}
//             </button>
//           </div>

//           {locationResults.length > 0 && (
//             <div className="mt-2 border border-gray-200 rounded-md max-h-40 overflow-y-auto">
//               {locationResults.map((location) => (
//                 <button
//                   key={location.id}
//                   type="button"
//                   onClick={() => selectLocation(location)}
//                   className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//                 >
//                   <div className="font-medium">{location.name}</div>
//                   {location.location && (
//                     <div className="text-xs text-gray-500">
//                       {location.location.street}
//                       {location.location.street && ", "}
//                       {location.location.city}
//                       {location.location.city && ", "}
//                       {location.location.country}
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}

//           <div className="mt-2">
//             <label
//               htmlFor="locationId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Location ID
//             </label>
//             <input
//               type="text"
//               id="locationId"
//               name="locationId"
//               value={formData.locationId || ""}
//               onChange={handleChange}
//               placeholder="Enter valid location ID"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
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

// import { useState, useEffect } from "react";

// interface FormData {
//   imageUrl: string;
//   caption: string;
//   userTags?: string;
//   locationId?: string;
// }

// interface SubmitResult {
//   success: boolean;
//   publishedPostId?: string;
//   error?: string;
// }

// interface Location {
//   id: string;
//   name: string;
//   location?: {
//     city?: string;
//     country?: string;
//     street?: string;
//     state?: string;
//     zip?: string;
//     latitude?: number;
//     longitude?: number;
//   };
//   link?: string;
//   verified?: boolean;
// }

// const Instagram = () => {
//   const [formData, setFormData] = useState<FormData>({
//     imageUrl: "",
//     caption: "",
//     userTags: "",
//     locationId: "",
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [result, setResult] = useState<SubmitResult | null>(null);
//   const [isSearchingLocation, setIsSearchingLocation] =
//     useState<boolean>(false);
//   const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");
//   const [locationResults, setLocationResults] = useState<Location[]>([]);
//   const [showUserTagsHelp, setShowUserTagsHelp] = useState<boolean>(false);
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(
//     null
//   );
//   const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout | null>(
//     null
//   );

//   // Get the base API URL from environment variables
//   const BASE_API_URL =
//     import.meta.env.VITE_API_ENDPOINT ||
//     "https://su5nbqyaxa.execute-api.ap-south-1.amazonaws.com/default";

//   // Debounced location search
//   useEffect(() => {
//     if (locationSearchTerm && locationSearchTerm.length >= 3) {
//       if (searchDebounce) clearTimeout(searchDebounce);

//       const debounceTimer = setTimeout(() => {
//         searchLocation();
//       }, 500);

//       setSearchDebounce(debounceTimer);
//     }

//     return () => {
//       if (searchDebounce) clearTimeout(searchDebounce);
//     };
//   }, [locationSearchTerm]);

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

//       // Post to Instagram endpoint
//       const postEndpoint = `${BASE_API_URL}/instagram/createPost`;

//       const response = await fetch(postEndpoint, {
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
//         locationId: "",
//       });
//       setLocationResults([]);
//       setSelectedLocation(null);
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

//   const searchLocation = async () => {
//     if (!locationSearchTerm || locationSearchTerm.length < 3) {
//       setLocationResults([]);
//       return;
//     }

//     setIsSearchingLocation(true);

//     try {
//       const searchEndpoint = `${BASE_API_URL}/location`;

//       const response = await fetch(searchEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ searchTerm: locationSearchTerm }),
//         mode: "cors",
//         credentials: "same-origin",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to search for locations");
//       }

//       const data = await response.json();
//       setLocationResults(data.locations || []);
//     } catch (error) {
//       console.error("Error searching for locations:", error);
//       setLocationResults([]);
//     } finally {
//       setIsSearchingLocation(false);
//     }
//   };

//   const selectLocation = (location: Location) => {
//     setSelectedLocation(location);
//     setFormData((prev) => ({
//       ...prev,
//       locationId: location.id,
//     }));
//     setLocationResults([]);
//   };

//   const clearLocation = () => {
//     setSelectedLocation(null);
//     setFormData((prev) => ({
//       ...prev,
//       locationId: "",
//     }));
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

//         <div>
//           <label
//             htmlFor="locationSearch"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Search Location
//           </label>

//           {selectedLocation ? (
//             <div className="mb-3 p-3 bg-gray-50 rounded-md border border-gray-200">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="font-medium text-gray-900">
//                     {selectedLocation.name}
//                   </div>
//                   {selectedLocation.location && (
//                     <div className="text-sm text-gray-500">
//                       {selectedLocation.location.street &&
//                         `${selectedLocation.location.street}, `}
//                       {selectedLocation.location.city &&
//                         `${selectedLocation.location.city}, `}
//                       {selectedLocation.location.state &&
//                         `${selectedLocation.location.state}, `}
//                       {selectedLocation.location.country}
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={clearLocation}
//                   className="text-xs text-red-600 hover:text-red-800"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   id="locationSearch"
//                   value={locationSearchTerm}
//                   onChange={(e) => setLocationSearchTerm(e.target.value)}
//                   placeholder="Search for a place..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={searchLocation}
//                   disabled={
//                     isSearchingLocation || locationSearchTerm.length < 3
//                   }
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
//                 >
//                   {isSearchingLocation ? "..." : "Search"}
//                 </button>
//               </div>

//               {locationResults.length > 0 && (
//                 <div className="mt-2 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
//                   {locationResults.map((location) => (
//                     <button
//                       key={location.id}
//                       type="button"
//                       onClick={() => selectLocation(location)}
//                       className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 border-b border-gray-100 last:border-b-0"
//                     >
//                       <div className="font-medium flex items-center">
//                         {location.name}
//                         {location.verified && (
//                           <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                             Verified
//                           </span>
//                         )}
//                       </div>
//                       {location.location && (
//                         <div className="text-xs text-gray-500">
//                           {location.location.street &&
//                             `${location.location.street}, `}
//                           {location.location.city &&
//                             `${location.location.city}, `}
//                           {location.location.state &&
//                             `${location.location.state}, `}
//                           {location.location.country}
//                         </div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {locationSearchTerm.length >= 3 &&
//                 locationResults.length === 0 &&
//                 !isSearchingLocation && (
//                   <div className="mt-2 text-sm text-gray-500">
//                     No locations found. Try a different search term.
//                   </div>
//                 )}
//             </>
//           )}

//           <div className="mt-2">
//             <label
//               htmlFor="locationId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Location ID
//             </label>
//             <input
//               type="text"
//               id="locationId"
//               name="locationId"
//               value={formData.locationId || ""}
//               onChange={handleChange}
//               placeholder="Enter valid location ID"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <p className="mt-1 text-xs text-gray-500">
//               You can search for a location above or enter a known location ID
//               directly.
//             </p>
//           </div>
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
