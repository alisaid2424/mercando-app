"use server";

import { DOMAIN } from "@/constants/enums";

interface getImageUrlProps {
  imageFile: File;
  publicId: string;
  pathName: string;
}

export const getImageUrl = async ({
  imageFile,
  publicId,
  pathName,
}: getImageUrlProps) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", pathName);
  formData.append("publicId", publicId);

  try {
    const response = await fetch(`${DOMAIN}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return undefined;
  }
};
