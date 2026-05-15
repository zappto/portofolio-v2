"use client";

import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Code2,
  Heading2,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Save,
  SeparatorHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const lowlight = createLowlight(common);
const initialContent = `
  <h2>Admin editor draft</h2>
  <p>Use this editor pattern for projects, blog posts, and case studies.</p>
  <blockquote>Keep content structured, readable, and ready for static HTML output.</blockquote>
`;

export default function RichTextEditor() {
  const [jsonOutput, setJsonOutput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-64 rounded-b-xl bg-background px-4 py-4 outline-none prose-editor",
      },
    },
    onUpdate({ editor: currentEditor }) {
      setJsonOutput(JSON.stringify(currentEditor.getJSON(), null, 2));
      setHtmlOutput(sanitizeEditorHtml(currentEditor.getHTML()));
    },
  });
  const canEdit = !!editor;
  const toolbarGroups = useMemo(
    () => [
      [
        {
          label: "Paragraph",
          icon: Pilcrow,
          active: editor?.isActive("paragraph") ?? false,
          action: () => editor?.chain().focus().setParagraph().run(),
        },
        {
          label: "Heading",
          icon: Heading2,
          active: editor?.isActive("heading", { level: 2 }) ?? false,
          action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        },
      ],
      [
        {
          label: "Bold",
          icon: Bold,
          active: editor?.isActive("bold") ?? false,
          action: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: Italic,
          active: editor?.isActive("italic") ?? false,
          action: () => editor?.chain().focus().toggleItalic().run(),
        },
      ],
      [
        {
          label: "Link",
          icon: LinkIcon,
          active: editor?.isActive("link") ?? false,
          action: () => {
            const href = window.prompt("URL");
            if (!href) {
              return;
            }
            editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
          },
        },
        {
          label: "Image",
          icon: ImageIcon,
          active: false,
          action: () => {
            const src = window.prompt("Image URL");
            if (!src) {
              return;
            }
            editor?.chain().focus().setImage({ src }).run();
          },
        },
      ],
      [
        {
          label: "Bullet list",
          icon: List,
          active: editor?.isActive("bulletList") ?? false,
          action: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
          label: "Ordered list",
          icon: ListOrdered,
          active: editor?.isActive("orderedList") ?? false,
          action: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        {
          label: "Blockquote",
          icon: Quote,
          active: editor?.isActive("blockquote") ?? false,
          action: () => editor?.chain().focus().toggleBlockquote().run(),
        },
        {
          label: "Code block",
          icon: Code2,
          active: editor?.isActive("codeBlock") ?? false,
          action: () => editor?.chain().focus().toggleCodeBlock().run(),
        },
      ],
    ],
    [editor],
  );

  function saveOutput() {
    if (!editor) {
      return;
    }

    setJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
    setHtmlOutput(sanitizeEditorHtml(editor.getHTML()));
  }

  function insertDivider() {
    editor?.chain().focus().setHorizontalRule().run();
  }

  function insertCallout() {
    editor
      ?.chain()
      .focus()
      .insertContent("<blockquote><p>Callout: add context here.</p></blockquote>")
      .run();
  }

  return (
    <section className="portfolio-card overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-border p-5">
        <h2 className="text-2xl">Tiptap editor pattern</h2>
        <p className="text-sm text-muted-foreground">
          Toolbar, JSON persistence output, sanitized HTML generation, and admin-only
          dynamic loading.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-border bg-muted/35 p-3">
        {toolbarGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-wrap gap-2 border-r border-border pr-2 last:border-r-0">
            {group.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  type="button"
                  variant={item.active ? "default" : "outline"}
                  size="sm"
                  disabled={!canEdit}
                  onClick={item.action}
                >
                  <Icon data-icon="inline-start" aria-hidden="true" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" disabled={!canEdit} onClick={insertDivider}>
          <SeparatorHorizontal data-icon="inline-start" aria-hidden="true" />
          Divider
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={!canEdit} onClick={insertCallout}>
          <Quote data-icon="inline-start" aria-hidden="true" />
          Callout
        </Button>
        <Button type="button" size="sm" disabled={!canEdit} onClick={saveOutput}>
          <Save data-icon="inline-start" aria-hidden="true" />
          Save Output
        </Button>
      </div>
      <EditorContent editor={editor} />
      <div className="grid gap-4 border-t border-border p-4 lg:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Saved JSON output</span>
          <textarea
            readOnly
            value={jsonOutput}
            className="min-h-40 rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Generated sanitized HTML</span>
          <textarea
            readOnly
            value={htmlOutput}
            className="min-h-40 rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs"
          />
        </label>
      </div>
    </section>
  );
}

function sanitizeEditorHtml(html: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  document.querySelectorAll("script,style,iframe,object,embed").forEach((node) => {
    node.remove();
  });
  document.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.toLowerCase();
      if (name.startsWith("on") || value.startsWith("javascript:")) {
        node.removeAttribute(attribute.name);
      }
    });
  });

  return document.body.innerHTML;
}
