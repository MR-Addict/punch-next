import { chatObject, chatText, chatTool } from "@/lib/ai/chat";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await chatObject(
    "《我的世界》（Minecraft）是一款沙盒类电子游戏，开创者为马库斯·阿列克谢·泊松（Notch）。游戏由Mojang Studios维护，现隶属于微软Xbox游戏工作室。游戏最初于2009年5月17日作为Classic版本发布，并于2011年11月18日发布Java正式版。我的世界的游戏平台囊括桌面设备、移动设备和游戏主机。中国版现由网易游戏代理，于2016年5月20日在中国大陆运营。"
  );
  return Response.json(res);
}
