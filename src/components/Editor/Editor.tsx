import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { type EventInfo } from "@ckeditor/ckeditor5-utils";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

type EditorProps = {
  onChange?:
    | ((event: EventInfo<string, unknown>, editor: ClassicEditor) => void)
    | undefined;
  value: string | null | undefined;
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <CKEditor
      config={editorConfiguration}
      editor={ClassicEditor}
      data={value}
      onChange={onChange}
    />
  );
};

export default Editor;
