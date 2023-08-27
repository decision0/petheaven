import Pet from "../models/PetModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllPets = async (req, res) => {
  const { search, petStatus, petType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (petStatus && petStatus !== "all") {
    queryObject.petStatus = petStatus;
  }
  if (petType && petType !== "all") {
    queryObject.petType = petType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const pets = await Pet.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalPets = await Pet.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPets / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalPets, numOfPages, currentPage: page, pets });
};

export const createPet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({ pet });
};

export const getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  res.status(StatusCodes.OK).json({ pet });
};

export const updatePet = async (req, res) => {
  const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "pet modified", pet: updatedPet });
};

export const deletePet = async (req, res) => {
  const removedPet = await Pet.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "pet deleted", pet: removedPet });
};

export const showStats = async (req, res) => {
  let stats = await Pet.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$petStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Available: stats.Available || 0,
    Reserved: stats.Reserved || 0,
    Adopted: stats.Adopted || 0,
  };

  let monthlyApplications = await Pet.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
