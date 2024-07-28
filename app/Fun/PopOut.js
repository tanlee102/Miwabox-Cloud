import React, { useState, useEffect } from 'react'


export default class {
    
    constructor(isblock, isban,conFirmFun,idMember) {
      this.Block = isblock;
      this.Ban = isban;
      this.conFirmFun = conFirmFun;
      this.idMember = idMember;
    }

    removeActivity = (time) => {
        this.conFirmFun("Quản lý", "Bạn có muốn xóa hoạt động?",() => {
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                this.conFirmFun("Quản lý", 'Đã xóa hoạt động thành công!!');
            },500);
        });
    }


    addBan = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn chặn thành viên này?",() =>{
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                this.conFirmFun();
                this.Ban = true;
            },400);
        });
    }

    removeBan = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn bỏ chặn thành viên này?", () => {
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                this.Ban = false;
                this.conFirmFun();
            },400)
        })
    }


    addBlock = () => {
        if(this.Block == -1){
            this.conFirmFun("Thành viên", 'Not Work!!');
        }else{
            this.conFirmFun("Thành viên", "Bạn có muốn chặn thành viên này? Nếu bị chặn họ sẽ: </br> - Không được đăng bài trong các nhóm của bạn. </br> - Không được trả lời và thích các bài viết trong tương lai của bạn.",() => {
                this.conFirmFun("Thành viên");
                setTimeout(() => {
                    this.conFirmFun();
                    this.Block = true;
                },500);
            });
        }
    }


    removeBlock = () => {
        this.conFirmFun("Thành viên", "Bạn có muốn bỏ chặn thành viên này?", () => {
            this.conFirmFun("Thành viên");
            setTimeout(() => {
                this.Block = false;
                this.conFirmFun();
            },500);
        });
    }

};