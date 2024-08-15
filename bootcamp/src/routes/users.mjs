import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();
router.get("/api/users",
    query('filter')
        .isString()
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({ min: 3, max: 10 })
        .withMessage("Must be at least 3-10 characters"),

    (req, res) => {
        //? Validation Checked
        const result = validationResult(req);
        console.log(result);
        const { query: { filter, value } } = req;

        if (filter && value)
            return res.send(
                mockUsers.filter((user) => user[filter].includes(value))
            );
        return res.send(mockUsers);
    }
);

export default router;
