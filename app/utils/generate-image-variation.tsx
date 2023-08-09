export async function generateImageVariation(selectedImageUrl) {
  try {
    const resp = await fetch("/api/images/variation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: selectedImageUrl + '&width=1024' }),
    });

    if (!resp.ok) {
      throw new Error("Unable to generate the image");
    }

    const data = await resp.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export default generateImageVariation;
