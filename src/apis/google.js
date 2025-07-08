import {
  GoogleGenAI,
  createPartFromUri,
  createUserContent,
} from "@google/genai";

export default {
  ai: new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_KEY }),
  model: "gemma-3-4b-it",
  promptText: `Este es un documento personal. Analiza toda la información relacionada a los siguientes datos:
              - el nombre del documento.
              - el tipo de documento.
              - la fecha de expedición o entrada en vigencia (si la tiene).
              - la fecha de expiración o vencimiento (si la tiene).

              Después de analizar la información, retorna solamente la respuesta tomando en cuenta las restricciones, el formato y ejemplo como guía:
              Restricciones:
              - el nombre del documento debe ser descriptivo pero no mayor a 50 caracteres.
              - el tipo de documento en la respuesta debe ser uno de los siguientes: Certificado, Licencia, Identificación, Factura, Contrato. 
              - si el tipo de documento no encaja en alguno de los mencionados, se debe usar el más parecido. Por ejemplo, un diploma debe ser convertido a Certificado
              - si las fechas no se encuentran en el formato "año-mes-día" deben ser convertidas.

              Formato:
              nombre formal,tipo de documento,fecha de expedición o entrada en vigencia,fecha de expiración o vencimiento'

              Ejemplo: 
              Licencia de conducir,Licencia,2025-12-31,2029-12-31`,
  promptWithFile: function (uploadedFile) {
    return createUserContent([
      createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
      this.promptText,
    ]);
  },
};
