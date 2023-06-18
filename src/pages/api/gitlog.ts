import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import AnsiToHtml from "ansi-to-html";

type Data = {
  result: string;
  command: string;
};

const ansiToHtml = new AnsiToHtml();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { command } = req.query as { command: string };
  console.log(command, "command");
  if (req.method === "GET") {
    exec(command, { cwd: process.cwd() }, (err, stdout, stderr) => {
      console.log(stdout);
      const html = ansiToHtml.toHtml(stdout.replace(/\n/g, "<br />"));
      res.status(200).json({ result: html, command: command });
    });
  }
}
