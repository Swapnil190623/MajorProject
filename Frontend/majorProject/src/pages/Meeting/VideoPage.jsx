// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export default function VideoPage() {
//   const { id } = useParams();

//   const roomID = id;

//   const myMeeting = async (element) => {
//     // Generate Kit Token
//     const appID = 1148121840;
//     const serverSecret = "8d1d53fd15e2b0c236db3d4f2df40de1";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomID,
//       Date.now().toString(),
//       "Your name"
//     );

//     // Create instance object from Kit Token
//     const zp = ZegoUIKitPrebuilt.create(kitToken);

//     // Start the call
//     zp.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Copy link",
//           url: `${window.location.origin}/room/${roomID}`,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall,
//       },
//     });
//   };

//   // Use useEffect to call myMeeting
//   useEffect(() => {
//     const container = document.getElementById("meeting-container");
//     if (container) {
//       myMeeting(container);
//     }
//   }, []);

//   return (
//     <div
//       id="meeting-container"
//       style={{ width: "100vw", height: "100vh" }} //position: "absolute", top:"30px", left:"100px",
//     >
//     </div>
//   );
// }