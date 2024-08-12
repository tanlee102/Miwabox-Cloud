export const metadata = {
  title: "Social Media",
  description: "Generated by Miwabox.live",
};


import "./globals.css";
import "./styles/Nav/Menu.css";
import "./styles/Nav/MenuRes.css";
import "./styles/ShowPanel/Modal.css"
import "./styles/ShowPanel/ModalRes.css"
import "./styles/Login/Login.css"
import "./styles/Login/Login_Res.css"
import "./styles/Dialog/Dialog.css"
import "./styles/Dialog/DialogRes.css"
import "./styles/Member/MemberTab.css"
import "./styles/ItemTab/ItemTab.css"
import "./styles/ItemTab/ItemTab_Res.css"
import "./styles/Account/NotificationHub.css"
import "./styles/Profile/Profile.css"
import "./styles/Profile/ProfileRes.css"
import "./styles/MenuBar/HorizonMenu.css"
import "./styles/HomePage/HomePageRes.css"
import "./styles/Post/ItemPost.css"
import "./styles/Post/ItemPostRes.css"
import "./styles/Post/Post.css"
import "./styles/Other/LoadMore.css"
import "./styles/Other/DropDown.css"
import "./styles/Other/PopOutMemberPanel.css"

import WindowProvider from "./context/WindowContext";
import LayoutProvider from "./context/LayoutContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/thinline.css"/>
        </head>
        <body>
          <LayoutProvider>
            <WindowProvider>
                {children}
            </WindowProvider>
          </LayoutProvider>
        </body>
    </html>
  );
}