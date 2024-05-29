const { Request, Response, Router } = require("express");
const upload = require("../services/image-upload");
const { cloudinaryAPI } = require("../utils/cloudinary");

const router = Router();

router.post("/upload", upload.single("image"), (req, res) => {
    try {
        return res.json({ image: req.file.path });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/upload/multiple", upload.array("images"), async (req, res) => {
    try {
        const images = req.files.map((file) => file.path);
        return res.json({ images });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { image } = req.body;
        const response = await cloudinaryAPI.uploader.destroy(image);
        return res.json({ success: true, message: "Image deleted successfully", data: response.result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;