import Router from "express";
import multer from "multer";
import path from "path";

const uploadRouter = Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

uploadRouter.post("/", upload.single("file"), (req, res) => {
  if(!req.file) {
    return res.render("index", { messages: ["Please select a file to upload."] });
  }
  res.redirect("/");
})

export default uploadRouter;