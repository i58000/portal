// import Account from "@/models/Account";
// import axios from "axios";
// import $store from "@/store";

// export const queryGroup = async () => {
//   const resp = await axios.get("/api/v1/chat/group");
//   return resp.data.groups
// };

// export const createGroup = async (accounts: Array<Account>) => {
//   console.log("api createGroup", accounts);
//   let title = $store.account?.nickname || ""
//   for (let index = 0; index < accounts.length && index < 4; index++) {
//     const acc = accounts[index];
//     title += " " + acc.nickname
//   }
//   const resp = await axios.post("/api/v1/chat/group", {
//     accounts,
//     title
//   });

//   return resp.data.group;
// };
