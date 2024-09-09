import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import uploadIcon from "@/assets/profile/upload.svg";

interface FileWithPreview extends File {
  preview: string;
}

const FileUploadComponent = () => {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [],
      "application/vnd.ms-powerpoint": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0];
      const fileWithPreview = Object.assign(uploadedFile, {
        preview: URL.createObjectURL(uploadedFile),
      }) as FileWithPreview;
      setFile(fileWithPreview);
      handleFileUpload(fileWithPreview);
    },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const handleFileUpload = async (file: FileWithPreview) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);

    setUploading(false);
  };

  return (
    <label
      {...getRootProps()}
      className="dashed mt-7 flex h-[253px] w-[271px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px]"
      htmlFor="file"
    >
      {file ? (
        <p className="text-xl font-bold text-primary-first">{file.name}</p>
      ) : (
        <>
          <img src={uploadIcon} alt="Upload icon" />
          <p className="text-[20px] font-semibold text-primary-first">
            ارفع الملف هنا
          </p>
          <p className="text-xs font-semibold text-[#5D6A93]">
            أقصي حجم 20 ميحا
          </p>
        </>
      )}
      <input {...getInputProps()} id="file" type="file" className="hidden" />
      {uploading ? "Uploading..." : ""}
    </label>
  );
};

export default FileUploadComponent;
