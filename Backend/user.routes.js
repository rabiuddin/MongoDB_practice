import express from "express";
import {
  insertOne,
  insertMany,
  findMany,
  findOne,
  updateOne,
  updateMany,
  replaceOne,
  deleteOne,
  deleteMany,
  createIndex,
  deleteIndex,
  getIndexes,
  renameCollection,
  dropCollection,
  getCollections,
} from "./user.controller.js";

const router = express.Router();

router.post("/insertOne", insertOne);
router.post("/insertMany", insertMany);

router.post("/find", findMany);
router.post("/findOne", findOne);

router.post("/updateOne", updateOne);
router.post("/updateMany", updateMany);
router.post("/replaceOne", replaceOne);

router.post("/deleteOne", deleteOne);
router.post("/deleteMany", deleteMany);

router.post("/createIndex", createIndex);
router.post("/deleteIndex", deleteIndex);
router.post("/getIndexes", getIndexes);

router.post("/renameCollection", renameCollection);
router.post("/dropCollection", dropCollection);
router.post("/listCollections", getCollections);

export default router;
