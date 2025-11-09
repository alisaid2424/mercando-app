"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { Progress } from "@/components/ui/progress";

interface UploadImageProps<T extends FieldValues> {
  currentImage?: string | string[];
  altImage: string;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  multiple?: boolean;
  maxFiles?: number;
  readOnly?: boolean;
}

const UploadImage = <T extends FieldValues>({
  currentImage,
  altImage,
  setValue,
  errors,
  name,
  multiple = false,
  maxFiles = 4,
  readOnly = false,
}: UploadImageProps<T>) => {
  const initialImages =
    typeof currentImage === "string"
      ? [currentImage]
      : Array.isArray(currentImage)
      ? currentImage
      : [];

  const [files, setFiles] = useState<(string | File | undefined)[]>(
    multiple ? Array(maxFiles).fill(undefined) : [undefined]
  );

  const [previews, setPreviews] = useState<string[]>(
    multiple ? Array(maxFiles).fill("") : initialImages
  );

  const [uploadProgress, setUploadProgress] = useState<(number | null)[]>(
    multiple ? Array(maxFiles).fill(null) : [null]
  );

  const [uploadComplete, setUploadComplete] = useState<boolean[]>(
    multiple ? Array(maxFiles).fill(false) : [!!initialImages[0]]
  );

  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (multiple && Array.isArray(currentImage) && currentImage.length > 0) {
      setPreviews(currentImage);
      setUploadComplete(currentImage.map(() => true));
      setFiles(currentImage);
    }

    if (!multiple && typeof currentImage === "string" && currentImage) {
      setPreviews([currentImage]);
      setUploadComplete([true]);
      setFiles([currentImage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simulateUpload = (fileSize: number, index: number) => {
    return new Promise<void>((resolve) => {
      const totalTime = Math.min(5000, fileSize / 50);
      const intervalTime = 100;
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += intervalTime;
        const progress = Math.min((elapsed / totalTime) * 100, 100);
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[index] = progress;
          return updated;
        });

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, intervalTime);
    });
  };

  /** Change pictures*/
  const handleImagesChange = async (
    selectedFiles: File[],
    startIndex: number
  ) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    const updatedProgress = [...uploadProgress];
    const updatedComplete = [...uploadComplete];

    for (let i = 0; i < selectedFiles.length; i++) {
      const index = startIndex + i;
      if (index >= maxFiles) break;

      const file = selectedFiles[i];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      updatedProgress[index] = 0;
      updatedComplete[index] = false;
    }

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setUploadProgress(updatedProgress);
    setUploadComplete(updatedComplete);

    for (let i = 0; i < selectedFiles.length; i++) {
      const index = startIndex + i;
      if (index >= maxFiles) break;
      await simulateUpload(selectedFiles[i].size, index);
      updatedProgress[index] = null;
      updatedComplete[index] = true;
    }

    setUploadProgress([...updatedProgress]);
    setUploadComplete([...updatedComplete]);
    updateFormValue(updatedFiles);
  };

  /** Delete a photo*/
  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    const updatedProgress = [...uploadProgress];
    const updatedComplete = [...uploadComplete];

    updatedFiles[index] = undefined;
    updatedPreviews[index] = "";
    updatedProgress[index] = null;
    updatedComplete[index] = false;

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setUploadProgress(updatedProgress);
    setUploadComplete(updatedComplete);

    updateFormValue(updatedFiles);
  };

  /** Update the form*/
  const updateFormValue = (updatedFiles: (string | File | undefined)[]) => {
    const cleanImages = updatedFiles.filter(
      (img): img is string | File =>
        img !== undefined && (typeof img === "string" || img instanceof File)
    );

    if (multiple) {
      setValue(name, cleanImages as T[typeof name], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const value = cleanImages.length > 0 ? cleanImages[0] : null;
      setValue(name, value as T[typeof name], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div>
      {multiple && <p className="text-base font-medium mb-2">{altImage}</p>}
      <div className="flex flex-wrap items-center gap-3">
        {(multiple ? [...Array(maxFiles)] : [0]).map((_, index) => (
          <div key={index} className="relative group">
            <input
              type="file"
              id={`image-${index}`}
              hidden
              accept="image/*"
              disabled={readOnly}
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files || []);
                if (selectedFiles.length > 0)
                  handleImagesChange(selectedFiles, index);
              }}
              multiple={multiple}
              ref={(el) => {
                fileInputs.current[index] = el;
              }}
            />

            <div
              onClick={() => !readOnly && fileInputs.current[index]?.click()}
              className={cn(
                multiple ? "w-32 h-32 rounded" : "w-48 h-48 rounded-full",
                "overflow-hidden border relative cursor-pointer bg-gray-100"
              )}
            >
              {previews[index] ? (
                <Image
                  src={previews[index]}
                  alt={`${altImage} ${index + 1}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="text-gray-400 w-8 h-8" />
                </div>
              )}

              <div
                className={cn(
                  "absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100",
                  uploadProgress[index] !== null &&
                    "opacity-100 cursor-not-allowed"
                )}
              >
                {uploadProgress[index] !== null ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Delete button*/}
              {multiple && previews[index] && !readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {uploadProgress[index] !== null && (
              <div className="mt-1 w-full">
                <Progress value={uploadProgress[index]!} />
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  Uploading... {Math.round(uploadProgress[index]!)}%
                </p>
              </div>
            )}

            {uploadComplete[index] && (
              <div className="text-green-600 text-sm mt-1 flex items-center gap-1 justify-center">
                <CheckCircle2 className="w-4 h-4" />
                Done
              </div>
            )}
          </div>
        ))}
      </div>

      {errors[name] && (
        <p className="text-sm text-red-500 mt-2">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default UploadImage;
