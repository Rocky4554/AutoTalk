
import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <div
                  className={message.role === "user" ? "message user" : "message"}
                  key={i}
                  style={{ display: "flex", flexDirection: "column", alignItems: message.role === "user" ? "flex-end" : "flex-start" }}
                >
                  {/* Show image only for user message if present */}
                  {message.img && message.role === "user" && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="200"
                      width="300"
                      transformation={[{ height: 200, width: 300 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                      style={{ marginBottom: "8px", borderRadius: "10px" }}
                    />
                  )}
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              ))}
                   
          {data && (
            <div className="newPrompt">
              <NewPrompt data={data}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
