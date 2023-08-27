import { Router } from "express";
const router = Router();
import {
  validatePetInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  showStats,
} from "../controllers/petController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllPets);
// router.post('/', createJob);

router
  .route("/")
  .get(getAllPets)
  .post(checkForTestUser, validatePetInput, createPet);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getPet)
  .patch(checkForTestUser, validatePetInput, validateIdParam, updatePet)
  .delete(checkForTestUser, validateIdParam, deletePet);

export default router;
