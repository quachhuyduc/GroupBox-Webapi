const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const changeStream = require('./services/changeStream');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config();

// Khởi tạo Express app
const app = express();
const port = process.env.PORT || 5000;

// Sử dụng body-parser để parse JSON từ request body
app.use(bodyParser.json());

// Sử dụng middleware cors để cho phép CORS
app.use(cors());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sử dụng các routes từ file routes
app.use('/api', routes);

app.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // Assuming you have logic to fetch user data including avatarUrl
    const userData = {
        avatarUrl: `uploads/${userId}-avatar.png`, // Use public URL
        // other user data
    };
    res.json(userData);
});

app.get('/api/collections', async (req, res) => {
    try {
        // Lấy danh sách các collection từ MongoDB
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi khi lấy danh sách các collection' });
    }
});


// Kết nối tới MongoDB bằng mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_NAME}`, {
    tls: true,
    tlsAllowInvalidCertificates: true, // Bỏ qua chứng chỉ không hợp lệ
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // changeStream();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Thoát khỏi ứng dụng nếu không kết nối được tới MongoDB
    });


// Middleware để xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ status: 'ERR', message: err.message });
});


// Khởi động server và lắng nghe các kết nối trên cổng đã chỉ định
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

