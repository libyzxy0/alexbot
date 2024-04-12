import { FCAEvent } from "../types";
import axios from 'axios';

export default async function ({ api, event }: { api: any; event: FCAEvent }) {
  let data = event.body.split(" ");
  if(data.lenght > 2) {
    api.sendMessage("Please provide a question!", event.threadID, event.messageID);
  } else {
    try {
      let txt = data.join(" ");
      let res = await axios.get(`https://joshweb.click/gpt4?prompt=${txt}&uid=${event.senderID}`);
      if(res.data) {
        api.sendMessage(res.data["gpt4"], event.threadID, event.messageID);
      } else {
        api.sendMessage("Can't answer that question!", event.threadID, event.messageID);
      }
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
}
