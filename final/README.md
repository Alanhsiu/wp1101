# wp1101 Final

topic: 台大家教網
組員: 電機二謝承修 B09901066 電機二張創渝 B09901069 電機二陳信佑 B09901037

安裝與測試:
開啟final檔案 在最外層和backend/frontend 分別yarn
自行新增.env檔，填入MONGO_URL=(自己的mongodb)
並在.env.default 中新增:
    EMAILACCOUNT = "ntu.tutorial.website@gmail.com"
    EMAILPASSWORD = "@bcd1234"
這邊的email address 與 email password 是我們特別辦來送驗證信的帳號
yarn start 執行前端
yarn server 執行後端


第一次使用前要先註冊，userID 和 password 要是英數 可以填學號並到學校信箱
(.....@ntu.edu.tw)收信
登入之後可以點profile 來創建，更新履歷 / 點 publish case來發布案件
在主頁可以看所有的cases/resume，點 for more information..... 可以看詳細的內容

亮點: 
    * 有使用RWD設計，UI/UX設計符合大眾習慣。(助教可以試著改變視窗大小就可以發現)
    * 使用自動發信功能，雖然沒有驗證的功能，但一樣可以達到通知的效果
    * 有使用private route來阻擋未登入的行為

未完成部分: 
    * 連絡家長/老師的聊天室功能
    * 驗證信的功能


