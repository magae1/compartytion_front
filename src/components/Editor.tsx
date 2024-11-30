"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import {
  LuUndo2,
  LuRedo2,
  LuBold,
  LuItalic,
  LuHighlighter,
  LuStrikethrough,
  LuUnderline,
  LuQuote,
  LuList,
  LuCode2,
  LuHeading1,
  LuHeading2,
} from "react-icons/lu";

const Editor = () => {
  const editor = useEditor({
    content: "<p>Hello World! 🌎️</p>",
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-secondary",
        },
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  return (
    <>
      {editor && (
        <div className={"flex gap-1"}>
          <button
            className={"btn btn-square btn-sm"}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <LuUndo2 />
          </button>
          <button
            className={"btn btn-square btn-sm"}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <LuRedo2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`btn btn-square btn-sm ${editor.isActive({ level: 1 }) ? "btn-accent" : ""}`}
          >
            <LuHeading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`btn btn-square btn-sm ${editor.isActive({ level: 2 }) ? "is-active" : ""}`}
          >
            <LuHeading2 />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`btn btn-square btn-sm ${editor.isActive("bold") ? "btn-accent" : ""}`}
          >
            <LuBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn btn-square btn-sm ${editor.isActive("italic") ? "btn-accent" : ""}`}
          >
            <LuItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`btn btn-square btn-sm ${editor.isActive("highlight") ? "btn-accent" : ""}`}
          >
            <LuHighlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`btn btn-square btn-sm ${editor.isActive("strike") ? "btn-accent" : ""}`}
          >
            <LuStrikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`btn btn-square btn-sm ${editor.isActive("underline") ? "btn-accent" : ""}`}
          >
            <LuUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`btn btn-square btn-sm ${editor.isActive("blockquote") ? "btn-accent" : ""}`}
          >
            <LuQuote />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`btn btn-square btn-sm ${editor.isActive("bulletList") ? "btn-accent" : ""}`}
          >
            <LuList />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`btn btn-square btn-sm ${editor.isActive("codeBlock") ? "btn-accent" : ""}`}
          >
            <LuCode2 />
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
