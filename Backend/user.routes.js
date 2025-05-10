import express from "express";

const router = express.Router();

router.post("/insertOne", insertOne);
router.post("insertMany", insertMany);

router.post("/find", findMany);
router.post("/findOne", findOne);

router.patch("/updateOne", updateOne);
router.patch("/updateMany", updateMany);
router.put("/replaceOne", replaceOne);

router.delete("/deleteOne", deleteOne);
router.delete("/deleteMany", deleteaMany);

router.post("/createIndex", createIndex);
router.delete("/deleteIndex", deleteIndex);
router.get("/getIndexes", getIndexes);

router.post("/renameCollection", renameCollection);
router.delete("dropCollection", dropCollection);
router.get("/getCollections", getCollections);

export default router;
