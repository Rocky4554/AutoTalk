
import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);
  const hasRun = useRef(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/stream`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: data._id,
          question: text,
          inlineData: Object.keys(img.aiData).length > 0 ? img.aiData.inlineData : undefined,
          img: img.dbData?.filePath || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Parse SSE chunk: "data: {...}\n\n"
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (jsonStr === "[DONE]") {
              // Stream finished
              break;
            }
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                accumulatedText += data.text;
                setAnswer(accumulatedText);
              }
            } catch (e) {
              // Ignore parse errors for partial chunks (simple implementation)
              console.error("Error parsing chunk", e);
            }
          }
        }
      }

      // After stream is done, refresh history
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] });

      if (!isInitial) {
        formRef.current.reset();
        setQuestion("");
        setAnswer("");
        setImg({
          isLoading: false,
          error: "",
          dbData: {},
          aiData: {},
        });
      }

    } catch (err) {
      console.log("Chat Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false);
  };

  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    hasRun.current = true;
  }, [data?.history]);

  return (
    <>
      {img.isLoading && <div className="loading">Loading...</div>}
      {img.error && <div className="error">{img.error}</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="Submit" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
