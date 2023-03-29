export interface AssetData {
  url: string;
  contentType: string;
  alt: string;
  fileName: string;
  size?: number;
  width?: number;
  height?: number;
}
export interface ImageData {
  url?: string;
  contentType: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LocalizedGetter<T, TOptions = never> {
  (locales: readonly string[], options?: TOptions): Promise<Record<string, T>>;
}
