import * as mongoDB from "mongodb";
export interface Body {
  update_id: number;
  message: Message;
}

export interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
}
export interface PostToDB {
  postData: Body;
  aiResponse: string;
}
export interface Chat {
  id: number;
  title: string;
  type: string;
  all_members_are_administrators: boolean;
}

export interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}
export interface AiResponse {
  statusCode: number;
  response: string;
}

export interface QuestionAnswer {
  question: string;
  aiAnswer: string;
}
