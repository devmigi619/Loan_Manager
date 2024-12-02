require('dotenv').config(); // .env 파일에서 환경 변수를 로드

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./routes/loanRoutes');
const authenticate = require('./middleware/authenticate'); // 인증 미들웨어 임포트

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 인증된 사용자만 접근 가능한 경로 설정
app.use('/api/loans', authenticate, loanRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// 간단한 기본 라우트
app.get('/', (req, res) => {
  res.send('Loan Manager API');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
