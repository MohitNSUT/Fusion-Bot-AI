import { Router } from "express";
import { summaryController, paragraphController, chatbotController, jsconverterController, grammerCheckerController } from "../controllers/openiaController.js";

const router = Router();

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/grammar", grammerCheckerController);

export default router;
