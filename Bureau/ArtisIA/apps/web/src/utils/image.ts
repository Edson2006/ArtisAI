export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    // Use our own proxy to avoid CORS issues with Firebase Storage
    const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image via proxy: ${response.statusText}`);
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    // If proxy fails, try returning the original URL as a last resort
    // (though it will likely fail in the PDF too if CORS is the issue)
    return url;
  }
};
