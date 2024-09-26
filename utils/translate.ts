import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const translate = async (input: string) => {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: "Translate this name into Chinese. do not say anything else.",
    prompt: input,
  });
  return text;
};

export default translate;
