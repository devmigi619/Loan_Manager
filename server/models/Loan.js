const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanName: { type: String, required: true },          // 대출명
  lenderBank: { type: String, required: true },        // 대출은행
  totalAmount: { type: Number, required: true },       // 대출총액
  remainingAmount: { type: Number, required: true },   // 잔액
  interestRate: { type: Number, required: true },      // 금리
  startDate: { type: Date, required: true },           // 대출 시작일
  endDate: { type: Date, required: true },             // 대출 종료일
  repaymentDate: { type: Date, required: true },       // 상환일
  monthlyRepayment: { type: Number, required: true },  // 월평균상환액
  repaymentBank: { type: String, required: true },     // 상환은행
  repaymentAccount: { type: String, required: true },  // 상환계좌
  repaymentStartDate: { type: Date, required: true },  // 상환개시일
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 사용자를 식별할 수 있는 필드 (참조)
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
