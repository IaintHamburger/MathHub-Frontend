import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const Playground = (): React.JSX.Element => {
  const [latexSyntax, setLatexSyntax] = useState<string>(
    "這是 **Markdown** 語法\n行內公式：$E = mc^2$\n區塊公式：$$\\int_0^\\infty x^2 dx$$",
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-10">
      <div className="flex w-1/2 p-4">
        <MDEditor
          value={latexSyntax}
          onChange={setLatexSyntax as (value: string | undefined) => void}
          preview="edit"
          className="w-full"
          height={400}
          minHeight={400}
        />
      </div>

      <div className="flex flex-col w-1/2 p-4">
        <div className="text-2xl font-bold mb-4 text-white">
          原生 Markdown 渲染
        </div>
        <MDEditor.Markdown source={latexSyntax} />
      </div>

      <div className="flex flex-col w-1/2 p-4">
        <div className="text-2xl font-bold mb-4 text-white">
          React Markdown 渲染
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => (
              <p className="whitespace-pre-line mb-4 text-left">{children}</p>
            ),
          }}
        >
          {latexSyntax}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Playground;
