'use client';

import { useContext } from "react";
import Nav from "./components/Nav";
import { WindowContext } from "./context/WindowContext";
import CreateLoginModal from "./components/Login/CreateLoginModal";
import Modal from "./components/ShowPanel/Modal";
import CreateRegisterModal from "./components/Login/CreateRegisterModal";
import CreateForgotPass from "./components/Login/CreateForgotPass";

export default function Home() {


  const {darkMode, displayLoginModel, setDisplayLoginModel, displayRegisterModel, setDisplayRegisterModel, displayForgotModel, setDisplayForgotModel} = useContext(WindowContext);

  return (
    <main className="content" dark-mode={darkMode ? "true" : "false"}>
        <Nav></Nav>
        <div className="fr-content">
        </div>

        <Modal displayModel={displayLoginModel} setDisplayModel={setDisplayLoginModel} title={'Đăng nhập'} displayfooter={true} body={<CreateLoginModal />}/>
        <Modal displayModel={displayRegisterModel} setDisplayModel={setDisplayRegisterModel} title={'Tạo tài khoảng'} displayfooter={true} body={<CreateRegisterModal />}/>
        <Modal displayModel={displayForgotModel} setDisplayModel={setDisplayForgotModel} title={'Quên mật khẩu'} displayfooter={true} body={<CreateForgotPass />}/>
    </main>
  );
}