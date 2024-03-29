import Game from "../models/Game.js";
import { GamesData } from "../data/GamesData.js";

export const importGames = async (req, res) => {
    try {
        await Game.deleteMany({});
        const games = await Game.insertMany(GamesData);
        res.status(201).json(games);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createGame = async (req, res) => {
    try {
        const { apiId } = req.body;
        const newGame = new Game({
            apiId,
            comments: [],
            ratings: [],
        });
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getFeedGames = async (req, res) => {
    try {
        const { genre, search } = req.query;
        let query = {
            ...(genre && { genre }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };

        const page = Number(req.query.pageNumber) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const games = await Game.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const count = await Game.countDocuments(query);
        res.status(200).json({
            games,
            page,
            pages: Math.ceil(count / limit),
            totalGames: count,
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getGame = async (req, res) => {
    try {
        const { apiId } = req.params;
        const exists = await Game.exists({ apiId });
        const game = await Game.find({ apiId });
        if (exists) {
            res.status(200).json(game);
        } else {
            const newGame = new Game({
                apiId,
                comments: [],
                ratings: [],
            });
            const savedGame = await newGame.save();
            res.status(201).json(savedGame);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const rateGame = async (req, res) => {
    try {
        const { apiId } = req.params;
        const { userId, rate } = req.body;
        const game = await Game.find({apiId})

        game[0].ratings.set(userId, rate)

        const updatedGame = await Game.findOneAndUpdate(
            { apiId: apiId },
            { ratings: game[0].ratings },
            {new : true}
        )

        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
