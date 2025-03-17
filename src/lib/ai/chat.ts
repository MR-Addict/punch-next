import { z } from "zod";
import { ollama } from "ollama-ai-provider";
import { generateObject, generateText, tool } from "ai";
import getArchivedNotes from "../notes/getArchivedNotes";

const model = ollama("llama3.1");

export async function chatObject(text: string) {
  const { object } = await generateObject({
    model,
    output: "array",
    schema: z.string(),
    prompt: `
  你是一个专业的命名实体识别(NER)模型，擅长从文本中提取命名实体，输出的格式应该是一个数组，数组中包含所有提取到的命名实体。每个命名实体应该是一个字符串。请从下面的文本中提取命名实体："${text}"
`
  });

  return object;
}

export async function chatText() {
  const { text } = await generateText({
    model,
    prompt: "Hello"
  });
  return text;
}

export async function chatTool() {
  const res = await generateText({
    model,
    system:
      "你是一个帮助用户查询归档笔记的 AI，你可以使用关键字查询归档笔记。当不知道查询的关键字的时候，可以尝试使用空的字符串获得所有的归档笔记进行回答",
    tools: {
      queryNotes: tool({
        description: "使用关键字查询归档笔记",
        parameters: z.object({
          query: z.string().describe("用于查询的关键字，将会在归档笔记的 `name` 和 `content` 字段中进行匹配")
        }),
        execute: async ({ query }) => getArchivedNotes(1, 1, 1000, query)
      })
    },
    maxSteps: 5,
    messages: [{ role: "user", content: "一共有多少篇归档笔记，其中都有谁在积极地提交笔记" }]
  });
  return res.text;
}
