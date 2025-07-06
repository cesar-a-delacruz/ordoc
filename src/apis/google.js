import {
  GoogleGenAI,
  createPartFromUri,
  createUserContent,
} from "@google/genai";

export default {
  ai: new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_KEY }),
  model: "gemma-3-4b-it",
  promptWithFile: async function (file, text) {
    const uploadedFile = await this.ai.files.upload({
      file: file,
    });
    return createUserContent([
      createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
      text,
    ]);
  },
};
