import Button from "@/components/Button";
import { writeClipboardText } from "@/util/writeClipboardText";
import React from "react";
import { toast } from "react-toastify";

interface CopyButtonsProps {
  content: string;
  tags: {
    id: number;
    name: string;
  }[];
}

const CopyButtons = ({ content, tags }: CopyButtonsProps) => {
  return (
    <div className="sticky py-4 bottom-14 flex justify-center z-10 gap-4">
      <Button
        variant="primary"
        size="normal"
        onClick={async (e) => {
          e.preventDefault();
          await writeClipboardText(content.replace(/\n/, ""));
          toast("인스타 문구가 복사되었습니다.");
        }}
      >
        문구 복사하기
      </Button>
      <Button
        variant="primary"
        size="normal"
        onClick={async (e) => {
          e.preventDefault();
          await writeClipboardText(tags.map((tag) => tag.name).join(" "));
          toast("인스타 태그가 복사되었습니다.");
        }}
      >
        태그 복사하기
      </Button>
    </div>
  );
};

export default CopyButtons;
