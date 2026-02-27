"use client";

import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image"; // Dùng cái này là đủ
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
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
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
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";

// Interface Props
interface SimpleEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

// --- Component Nút Thêm Ảnh Mới (Đơn giản & Ổn định) ---
const CustomImageButton = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert sang Base64
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string" && editor) {
          // Chèn ảnh vào Editor dùng lệnh chuẩn của Tiptap
          editor.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input để chọn lại file cũ được
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1"
      >
        <BiImageAdd className="w-4 h-4" />
        <span className="text-sm">Thêm ảnh</span>
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
  editor, // Nhận editor để truyền vào nút ảnh
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
    <>
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
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
      <ToolbarSeparator />
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
      <ToolbarSeparator />

      {/* Nút thêm ảnh mới - Không dùng ImageUploadButton cũ nữa */}
      <ToolbarGroup>
        <CustomImageButton editor={editor} />
      </ToolbarGroup>

      <Spacer />
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>
    <ToolbarSeparator />
    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({ content = "", onChange }: SimpleEditorProps) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "simple-editor focus:outline-none",
      },
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);

        // Tìm xem có file ảnh nào trong clipboard không
        const imageItem = items.find((item) => item.type.startsWith("image"));

        if (imageItem) {
          event.preventDefault(); // Ngăn hành động paste mặc định
          const file = imageItem.getAsFile();

          if (file) {
            // Convert sang Base64
            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              if (src) {
                // Chèn ảnh vào vị trí con trỏ hiện tại
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              }
            };
            reader.readAsDataURL(file);
            return true; // Đã xử lý xong, Tiptap không cần làm gì thêm
          }
        }

        return false; // Nếu không phải ảnh, cho phép paste text bình thường
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

      // QUAN TRỌNG: Chỉ dùng Image chuẩn, GỠ BỎ ImageUploadNode
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
  });

  // FIX LỖI MẤT ẢNH KHI EDIT: Cập nhật nội dung khi API load xong
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      // Chỉ update nếu nội dung thực sự khác biệt để tránh nhảy con trỏ
      // Kiểm tra sơ bộ độ dài để tránh so sánh chuỗi quá lớn liên tục
      if (Math.abs(editor.getHTML().length - content.length) > 10) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="flex flex-col w-full relative">
      <style jsx global>{`
        .ProseMirror {
          max-width: 800px !important;
          margin: 0 auto !important;
          padding: 2rem 1.5rem !important;
          min-height: 500px;
          outline: none !important;
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
        /* Style cho ảnh trong editor */
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
        <div className="border-b border-gray-100 bg-gray-50/95 sticky top-16.25 z-999 shrink-0 backdrop-blur-md transition-all">
          <Toolbar
            ref={toolbarRef}
            style={{
              ...(isMobile
                ? { bottom: `calc(100% - ${height - rect.y}px)` }
                : {}),
            }}
          >
            {mobileView === "main" ? (
              <MainToolbarContent
                editor={editor} // Truyền editor xuống để nút ảnh dùng
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

        <div
          className="w-full bg-white cursor-text simple-editor-content"
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </EditorContext.Provider>
    </div>
  );
}
