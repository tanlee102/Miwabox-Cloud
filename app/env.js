export const env_variable = {
    
    URL_HOST: 'https://apx.vnthread.com', //SET DOMAIN FOR API
    URL_CLOUD: 'https://cloud.vnthread.com', //SET DOMAIN FOR API IMAGE
    URL_IMAGE_CLOUD: 'https://cloud.vnthread.com', //SET DOMAIN FOR CLOUD IMAGE
    // URL_HOST: 'http://localhost:2312',
    // URL_CLOUD: 'http://localhost:1200',
    // URL_IMAGE_CLOUD: 'http://localhost:7700',

    HOST_COOKIE_NAME: '.vnthread.com',
    // HOST_COOKIE_NAME: 'localhost',
    
    OLD_HOST_IMAGE: "imx.vnthread.fun", 
    URL_OLD_HOST_IMAGE: 'https://imx.vnthread.fun/', //SET URL IMAGE AFTER UPLOAD

    HOST_IMAGE: 'imx.vnthread.com',
    URL_HOST_IMAGE: 'https://imx.vnthread.com/', //UPLOAD IMAGE

    RANGESUBFORUM: 12,
    RANGETHREAD: 20,
    RANGEPOST: 10,
    RANGEMSGS: 10,
    RANGEMEMBER: 10,
    RANGEPOSTLINE: 10,
    RANGENOTIFICATION: 10,
    RANGEPOLL: 9,

    MAX_SUBFORUM_NAME_LENGTH: 130,
    MAX_SUBFORUM_INTRODUCE_LENGTH: 1000,
    MAX_POST_TITLE_LENGTH: 450,
    MAX_POST_LENGTH: 10000,
    MAX_DEFAULT_USER_LENGTH: 350,
    MAX_NAME_USER_LENGTH: 23,
    MAX_NAME_MEMBER_LENGTH: 55,
    MAX_DEFAULT_SEARCH_LENGTH: 90,

    MAX_LOW_LIST_LENGTH: 101,
    DAY_LOW_LIST_LENGTH: 3,
    DAY_POLLING_LIST_LENGTH: 3,

    MAX_LOW_HASH_LENGTH: 50,
    DAY_LOW_HASH_LENGTH: 5,


    MINUTE_ACCESS_TOKEN: 5,
    NAME_UNTOKEN: 'nah',

    LABEL_TAB_BAR: 'Ani VnThread',
    DESCRIPTION_META: 'Diễn đàn về anime, manga và truyện tranh - Nơi chia sẻ thông tin, thảo luận và giao lưu với cộng đồng yêu thích văn hóa Nhật Bản. Tìm kiếm thông tin về các bộ anime, manga mới nhất, đánh giá, bình luận và gợi ý từ thành viên khác. Tham gia ngay để trò chuyện, tìm bạn cùng sở thích và khám phá thế giới anime và manga đầy thú vị.',
    KEYWORDS_META: 'anime, manga, truyện tranh, diễn đàn, thông tin, thảo luận, bình luận, gợi ý, văn hóa Nhật Bản, cộng đồng, thành viên, trò chuyện, bạn bè, sở thích, khám phá, thế giới, yêu thích',
    SHORT_ICON_BAR: 'https://imx.vnthread.com/images/next/logoAniThread.png',
};

export const env_Image = (url) => {
    url = String(url).replace(env_variable.OLD_HOST_IMAGE, env_variable.HOST_IMAGE).replace('http:', 'https:');
    return url;
}

export const env_confirm_log = {

    SUBFORUM: {
        add: "Thêm nhóm",
        delete: "Xóa nhóm",
        update: "Cập nhật nhóm",

        ask_add: "Bạn có muốn thêm nhóm?",
        ask_update: "Bạn có muốn sửa nhóm?",
        ask_delete: "Bạn có muốn xóa nhóm?",

        suc_add: "Thêm nhóm thành công!",
        suc_update: "Cập nhật nhóm thành công!",
        suc_delete: "Xóa nhóm thành công!",
    },

    TOPIC: {
        add: "Thêm chủ đề",
        ask_add: "Bạn có muốn thêm chủ đề?",
        suc_add: "Thêm chủ đề thành công!",
    },

    TAG: {
        add: "Thêm thẻ",
        ask_add: "Bạn có muốn thêm thẻ?",
        suc_add: "Thêm thẻ thành công!",
    },

    LOGOUT: {
        log: "Đăng xuất",
        ask: "Bạn có muốn đăng xuất?",
        ask_another: "Bạn có muốn đăng xuất khỏi thiết bị này?",
        suc: "Đăng xuất thành công!",
    },

    UPDATEACCOUNT: {
        log: "Cập nhật",
        ask: "Bạn có muốn cập nhật tài khoản?",
        suc: "Cập nhật tài khoản thành công!",
    },

    MANGA: {
        add: "Thêm manga",
        delete: "Xóa manga",
        update: "Cập nhật manga",

        ask_add: "Bạn có muốn thêm manga này?",
        ask_update: "Bạn có muốn sửa manga này?",
        ask_delete: "Bạn có muốn xóa manga này?",

        suc_add: "Thêm manga thành công!",
        suc_update: "Cập nhật manga thành công!",
        suc_delete: "Xóa manga thành công!",
    },

    CHAPTER: {
        add: "Thêm chương",
        delete: "Xóa chương",
        update: "Cập nhật chương",

        ask_add: "Bạn có muốn thêm chương này?",
        ask_update: "Bạn có muốn sửa chương này?",
        ask_delete: "Bạn có muốn xóa chương này?",

        suc_add: "Thêm chương thành công!",
        suc_update: "Cập nhật chương thành công!",
        suc_delete: "Xóa chương thành công!",
    },


    ERRLOG: {
        system: "Đã xảy ra lỗi hệ thống!",
    }
}