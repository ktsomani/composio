export type FileUploadData = {
  name: string;
  mimetype: string;
  s3key: string;
};

export type FileDownloadData = {
  name: string;
  mimeType: string;
  s3Url: string;
  /**
   * Absolute path of the saved file, or `null` when this runtime has no
   * filesystem or the write failed.
   */
  filePath: string | null;
};
