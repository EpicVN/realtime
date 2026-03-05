"use client";

import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Placeholder from "@tiptap/extension-placeholder";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- CSS Imports ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- UI Components ---
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import {
  LinkButton,
  LinkContent,
  LinkPopover,
} from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";
import { BiImageAdd } from "react-icons/bi";

import "@/components/tiptap-templates/simple/simple-editor.scss";
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";

// Interface Props
interface SimpleEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

// --- Component Nút Thêm Ảnh Mới ---
const CustomImageButton = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && editor) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload thất bại");

        const data = await response.json();
        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (error) {
        console.error(error);
        alert("Lỗi khi tải ảnh lên server!");
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1 shrink-0"
      >
        <BiImageAdd className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">Thêm ảnh</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
};

const MainToolbarContent = ({
  editor,
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  editor: Editor | null;
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <div className="flex items-center flex-nowrap gap-1 w-max shrink-0 pr-2">
      <ToolbarGroup className="shrink-0 flex items-center">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator className="shrink-0 mx-1 h-6" />

      <ToolbarGroup className="shrink-0 flex items-center">
        <HeadingDropdownMenu levels={[1, 2, 3]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
      </ToolbarGroup>

      <ToolbarSeparator className="shrink-0 mx-1 h-6" />

      <ToolbarGroup className="shrink-0 flex items-center">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="underline" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator className="shrink-0 mx-1 h-6" />

      <ToolbarGroup className="shrink-0 flex items-center">
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator className="shrink-0 mx-1 h-6" />

      <ToolbarGroup className="shrink-0 flex items-center pr-2">
        <CustomImageButton editor={editor} />
      </ToolbarGroup>
    </div>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <div className="flex items-center flex-nowrap w-max shrink-0 pr-2">
    <ToolbarGroup className="shrink-0">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>
    <ToolbarSeparator className="shrink-0 mx-1 h-6" />
    <div className="shrink-0">
      {type === "highlighter" ? (
        <ColorHighlightPopoverContent />
      ) : (
        <LinkContent />
      )}
    </div>
  </div>
);

export function SimpleEditor({ content = "", onChange }: SimpleEditorProps) {
  const isMobile = useIsBreakpoint();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "simple-editor focus:outline-none min-h-[300px] w-full",
      },
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.startsWith("image"));

        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              if (src) {
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: { openOnClick: false, enableClickSelection: true },
      }),
      Placeholder.configure({
        placeholder: "Nhập nội dung bài viết tại đây...",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Subscript,
      Superscript,
      Selection,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      if (Math.abs(editor.getHTML().length - content.length) > 10) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="flex flex-col w-full h-full relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
      <style jsx global>{`
        .ProseMirror {
          max-width: 100% !important;
          margin: 0 !important;
          padding: 1.5rem 1rem !important;
          min-height: 300px;
          outline: none !important;
          width: 100%;
        }
        @media (min-width: 640px) {
          .ProseMirror {
            padding: 2rem !important;
            min-height: 500px;
          }
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .simple-editor-content {
          overflow-x: hidden;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
          display: block;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 3px solid #3b82f6;
        }
      `}</style>

      <EditorContext.Provider value={{ editor }}>
        {/* LỚP BỌC 1: Cố định (sticky) */}
        <div className="sticky top-0 z-20 w-full border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {/* LỚP BỌC 2: Vuốt ngang (overflow-x-auto) và giấu thanh cuộn */}
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide touch-pan-x">
            {/* ÉP TOOLBAR BUNG DÀI RA BẰNG CLASS !important */}
            <Toolbar className="relative! flex! flex-nowrap! w-max! min-w-full! border-none! bg-transparent! shadow-none! p-2! h-auto! overflow-visible!">
              {mobileView === "main" ? (
                <MainToolbarContent
                  editor={editor}
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </Toolbar>
          </div>
        </div>

        {/* Khu vực soạn thảo */}
        <div
          className="w-full cursor-text simple-editor-content flex-1"
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </EditorContext.Provider>
    </div>
  );
}
