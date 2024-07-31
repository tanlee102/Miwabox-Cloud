import axios from 'axios';
import Cookies from 'js-cookie';
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
        this.conFirmFun("Quản lý", "Bạn có muốn chặn thành viên này?", async () => {
            this.conFirmFun("Quản lý");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`http://localhost:8080/api/v1/users/toggle-ban/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.status === 200) {
                        this.conFirmFun();
                        this.Ban = true;
                    } else {
                        this.conFirmFun("Quản lý", "Failed to ban the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Quản lý", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }
    
    
    removeBan = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn bỏ chặn thành viên này?", async () => {
            this.conFirmFun("Quản lý");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`http://localhost:8080/api/v1/users/toggle-ban/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.status === 200) {
                        this.Ban = false;
                        this.conFirmFun();
                    } else {
                        this.conFirmFun("Quản lý", "Failed to unban the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Quản lý", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }
    

    addBlock = () => {
        if(this.Block == -1){
            this.conFirmFun("Thành viên", 'Not Work!!');
        }else{
            this.conFirmFun("Thành viên", "Bạn có muốn chặn thành viên này? Nếu bị chặn họ sẽ không được trả lời và thích các bài viết trong tương lai của bạn.",() => {
                this.conFirmFun("Thành viên");
                setTimeout(async () => {

                    try {
                        const token = Cookies.get('token');
                        const response = await axios.post('http://localhost:8080/api/v1/blocks/block?blockedId='+this.idMember, {}
                            ,{
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                }
                            }
                        );
    
                        if (response.status === 200) {
                            this.conFirmFun();
                            this.Block = true;
                        } else {
                            this.conFirmFun("Thành viên", "Failed to block the user.");
                        }
                    } catch (error) {
                        this.conFirmFun("Thành viên", "Error occurred: " + error.message);
                    }
                },500);
            });
        }
    }


    removeBlock = () => {
        this.conFirmFun("Thành viên", "Bạn có muốn bỏ chặn thành viên này?", () => {
            this.conFirmFun("Thành viên");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.delete(`http://localhost:8080/api/v1/blocks/unblock?blockedId=${this.idMember}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        this.conFirmFun();
                        this.Block = false;
                    } else {
                        this.conFirmFun("Thành viên", "Failed to unblock the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Thành viên", "Error occurred: " + error.message);
                }
            }, 500);
        });
    };


    setAdminRole = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn đặt thành viên này làm ADMIN?", async () => {
            this.conFirmFun("Quản lý");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`http://localhost:8080/api/v1/users/role/admin/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        this.conFirmFun();
                    } else {
                        this.conFirmFun("Quản lý", "Failed to set user as ADMIN.");
                    }
                } catch (error) {
                    this.conFirmFun("Quản lý", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }


};