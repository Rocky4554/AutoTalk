import imagekit from "../utils/imagekit.js";

export const getAuthenticationParameters = (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    res.status(500).send("Error getting authentication parameters");
  }
};