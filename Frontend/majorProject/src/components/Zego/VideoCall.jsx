import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = ()=>{
    const {roomId} = useParams();

    let myMeeting = async (element) => {

        // generate Kit Token
        const appID = 183105706;
        const serverSecret = "d0a75e265e9ae8590890477834ebba8b";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
       
        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
               container: element,
               sharedLinks: [
                 {
                   name: 'Personal link',
                   url:
                    window.location.protocol + '//' + 
                    window.location.host + window.location.pathname +
                     '?roomID=' +
                     roomID,
                 },
               ],
               scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
               },
          });
         };

         return (
            // <div
            // //   className="myCallContainer"
            //   ref={myMeeting}
            // //   style={{ width: '100vw', height: '100vh' }}
            // ></div>

            <div>
                <div ref={myMeeting}></div>
            </div>
          );
       
}


export  default VideoCall