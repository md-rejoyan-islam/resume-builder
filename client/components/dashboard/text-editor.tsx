"use client";

import { Button } from "@/components/ui/button";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  RotateCcw,
  Underline,
} from "lucide-react";
import "./text-editor.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ value, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: {} },
        orderedList: { HTMLAttributes: {} },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "bulletList", "orderedList"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div
        style={{ minHeight: "128px" }}
        className="border border-border rounded-lg bg-muted/50"
      />
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex gap-1 p-2 border-b border-border bg-card flex-wrap">
        <Button
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("underline") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8 p-0"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "left" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="h-8 w-8 p-0"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "center" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="h-8 w-8 p-0"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "right" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="h-8 w-8 p-0"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            editor
              .chain()
              .focus()
              .selectAll()
              .clearNodes()
              .setTextAlign("left")
              .run();
          }}
          className="h-8 w-8 p-0"
          title="Clear Formatting"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="max-w-none p-3 text-sm bg-card focus:outline-none"
        style={{ minHeight: "128px" }}
      />
    </div>
  );
}
