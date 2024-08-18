import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'

export default class {
    
    constructor(isblock, isban, conFirmFun, idMember) {
      this.Block = isblock;
      this.Ban = isban;
      this.conFirmFun = conFirmFun;
      this.idMember = idMember;
    }

    removeActivity = (time) => {
        this.conFirmFun("Management", "Do you want to delete this activity?", () => {
            this.conFirmFun("Management");
            setTimeout(() => {
                this.conFirmFun("Management", 'Activity successfully deleted!!');
            }, 500);
        });
    }

    addBan = () => {
        this.conFirmFun("Management", "Do you want to ban this member?", async () => {
            this.conFirmFun("Management");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/users/toggle-ban/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.status === 200) {
                        this.conFirmFun();
                        this.Ban = true;
                    } else {
                        this.conFirmFun("Management", "Failed to ban the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Management", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }
    
    removeBan = () => {
        this.conFirmFun("Management", "Do you want to unban this member?", async () => {
            this.conFirmFun("Management");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/users/toggle-ban/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.status === 200) {
                        this.Ban = false;
                        this.conFirmFun();
                    } else {
                        this.conFirmFun("Management", "Failed to unban the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Management", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }
    
    addBlock = () => {
        if (this.Block == -1) {
            this.conFirmFun("Member", 'Not Work!!');
        } else {
            this.conFirmFun("Member", "Do you want to block this member? If blocked, they will not be able to reply to and like your future posts.", () => {
                this.conFirmFun("Member");
                setTimeout(async () => {
                    try {
                        const token = Cookies.get('token');
                        const response = await axios.post('https://hoifancuongonepiece.site/api/v1/blocks/block?blockedId=' + this.idMember, {}
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
                            this.conFirmFun("Member", "Failed to block the user.");
                        }
                    } catch (error) {
                        this.conFirmFun("Member", "Error occurred: " + error.message);
                    }
                }, 500);
            });
        }
    }

    removeBlock = () => {
        this.conFirmFun("Member", "Do you want to unblock this member?", () => {
            this.conFirmFun("Member");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.delete(`https://hoifancuongonepiece.site/api/v1/blocks/unblock?blockedId=${this.idMember}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        this.conFirmFun();
                        this.Block = false;
                    } else {
                        this.conFirmFun("Member", "Failed to unblock the user.");
                    }
                } catch (error) {
                    this.conFirmFun("Member", "Error occurred: " + error.message);
                }
            }, 500);
        });
    };

    setAdminRole = () => {
        this.conFirmFun("Management", "Do you want to set this member as ADMIN?", async () => {
            this.conFirmFun("Management");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/users/role/admin/${this.idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        this.conFirmFun();
                    } else {
                        this.conFirmFun("Management", "Failed to set user as ADMIN.");
                    }
                } catch (error) {
                    this.conFirmFun("Management", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }
};
