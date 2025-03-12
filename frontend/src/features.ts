// src/constants/featuresData.ts

export interface Feature {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  image: string;
  bgColor?: string; // Optional: If you want different background colors per section
}

// export const featuresData: Feature[] = [
//   {
//     id: 1,
//     heading: "More effective. More fun.",
//     subheading:
//       "Brilliant's interactive approach teaches you to think, not memorize.",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu nisi non dolor interdum fermentum. Duis dignissim orci sit amet lorem ullamcorper.",
//     image:
//       "https://website-cdn.studysmarter.de//sites/2/sites/2/2021/12/Flashcard_Ill_3.svg",
//     bgColor: "bg-gray-50", // example
//   },
//   {
//     id: 2,
//     heading: "Learn at your own pace",
//     subheading: "Adaptive lessons that fit your schedule.",
//     description:
//       "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
//     image:
//       "https://website-cdn.studysmarter.de/2021/12/peYWiDgG-Hero_Explanations.svg",
//     bgColor: "bg-gray-50",
//   },

//   {
//     id: 3,
//     heading: "Learn at your own pace",
//     subheading: "Adaptive lessons that fit your schedule.",
//     description:
//       "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
//     image:
//       "https://www.studysmarter.co.uk/app/themes/studypress-core-theme/img/branding-pages/stories.svg ",
//     bgColor: "bg-gray-50",
//   },
//   // Add as many features as you need
// ];

export const featuresData: Feature[] = [
  {
    id: 1,
    heading: "Master Every Subject",
    subheading: "Comprehensive courses designed for your success",
    description:
      "Explore curriculum-aligned courses for all subjects, featuring interactive video lessons, practice exercises, and step-by-step explanations to build a rock-solid foundation in every topic.",
    image:
      "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735804829/e19hnps2nfrejrjzez4n.svg?_upload_ref=ic_img_tool&__ar__=1.00",
    bgColor: "",
  },

  {
    id: 2,
    heading: "Study Smarter and Ace Exams",
    subheading: "Interactive tools and real practice for exam success",
    description:
      "Millions of flashcards, notes, topic quizzes, and realistic mock tests to help you ace exams. Reinforce concepts, simulate exam conditions, track progress, and target weak areas for optimal prep.",
    image: "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735804825/zrmhrph3et214hxessyv.svg?_upload_ref=ic_img_tool&__ar__=1.00",
    bgColor: "",
  },
  {
    id: 3,
    heading: "Personalized Learning Paths",
    subheading: "Adaptive lessons tailored to your pace and goals",
    description:
      "Get custom study plans that evolve with you. Our platform recommends resources, adjusts difficulty, and celebrates milestones to keep you motivated.",
    image:
      "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735804823/gxbno6wza22cwsdeljyj.svg?_upload_ref=ic_img_tool&__ar__=1.00",
    bgColor: "",
  },
];
