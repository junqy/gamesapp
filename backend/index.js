import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import gameRoutes from "./routes/games.js"
import notificationRoutes from "./routes/notifications.js"
import commentsRoutes from "./routes/comments.js"
import { register } from "./controllers/auth.js"
import corsOptions from "./config/corsOptions.js"

// CONFIG
// .env file needs to update mongo_url for latest node.js (now is for 2.2.12)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors(corsOptions))
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

// ROUTES WITH FILES

app.post("/auth/register", upload.single("picture"), register)

// ROUTES
app.use("/auth", authRoutes)
app.use("/users", upload.single("picture"), userRoutes)
app.use("/games", gameRoutes)
app.use("/notifications", notificationRoutes)
app.use("/comments", commentsRoutes)

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))
