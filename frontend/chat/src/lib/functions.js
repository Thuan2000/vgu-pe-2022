import CookieUtil from "./cookie-util";

const SELECTED_TOPIC_COOKIE = "selected-chat-topic";

export function setSelectedTopic(topic) {
  console.log("SEtting", topic);

  CookieUtil.setObject(SELECTED_TOPIC_COOKIE, topic);
}
