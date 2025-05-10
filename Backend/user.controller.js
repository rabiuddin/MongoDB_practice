import { User } from "./user.model.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const insertOne = async (req, res) => {
  try {
    const document = req.body.document;
    if (!document || typeof document !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid document provided.",
      });
    }
    const result = await User.create(document);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const insertMany = async (req, res) => {
  try {
    const documents = req.body.documents;
    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid documents array provided.",
      });
    }
    const result = await User.insertMany(documents);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const findMany = async (req, res) => {
  try {
    const { query, limit, skip, sort } = req.body;
    if (query && typeof query !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid query object provided.",
      });
    }
    const options = {};
    if (limit) {
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({
          success: false,
          message: "Limit must be a positive number.",
        });
      }
      options.limit = parseInt(limit);
    }
    if (skip) {
      if (isNaN(skip) || skip < 0) {
        return res.status(400).json({
          success: false,
          message: "Skip must be a non-negative number.",
        });
      }
      options.skip = parseInt(skip);
    }
    if (sort && typeof sort !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid sort object provided.",
      });
    }
    options.sort = sort;

    const result = await User.find(query, null, options);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const findOne = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid query object provided.",
      });
    }
    const result = await User.findOne(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    const { filter, update } = req.body;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid filter object provided.",
      });
    }
    if (!update || typeof update !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid update object provided.",
      });
    }
    const result = await User.updateOne(filter, update);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMany = async (req, res) => {
  try {
    const { filter, update } = req.body;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid filter object provided.",
      });
    }
    if (!update || typeof update !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid update object provided.",
      });
    }
    const result = await User.updateMany(filter, update);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const replaceOne = async (req, res) => {
  try {
    const { filter, replacement } = req.body;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid filter object provided.",
      });
    }
    if (!replacement || typeof replacement !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid replacement object provided.",
      });
    }
    const result = await User.replaceOne(filter, replacement);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { filter } = req.body;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid filter object provided.",
      });
    }
    const result = await User.deleteOne(filter);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMany = async (req, res) => {
  try {
    const { filter } = req.body;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid filter object provided.",
      });
    }
    const result = await User.deleteMany(filter);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createIndex = async (req, res) => {
  try {
    const { fieldOrSpec, options } = req.body;
    if (!fieldOrSpec || typeof fieldOrSpec !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid fieldOrSpec object provided.",
      });
    }
    const result = await User.collection.createIndex(fieldOrSpec, options);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIndex = async (req, res) => {
  try {
    const { indexName } = req.body;
    if (!indexName || typeof indexName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid indexName provided.",
      });
    }
    const result = await User.collection.dropIndex(indexName);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIndexes = async (req, res) => {
  try {
    const result = await User.collection.indexes();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const renameCollection = async (req, res) => {
  try {
    const { newName } = req.body;
    if (!newName || typeof newName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid newName provided.",
      });
    }
    const result = await User.collection.rename(newName);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const dropCollection = async (req, res) => {
  try {
    const result = await User.collection.drop();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCollections = async (req, res) => {
  try {
    const collections = await User.db.db.listCollections().toArray();
    res.status(200).json({
      success: true,
      data: collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
