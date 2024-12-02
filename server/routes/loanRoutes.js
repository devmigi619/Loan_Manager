const express = require('express');
const Loan = require('../models/Loan');
const router = express.Router();

// 모든 대출 정보 조회 (GET)
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 새 대출 정보 추가 (POST)
router.post('/', async (req, res) => {
  const { loanName, lenderBank, totalAmount, remainingAmount, interestRate, startDate, endDate, repaymentDate, monthlyRepayment, repaymentBank, repaymentAccount, repaymentStartDate } = req.body;
  try {
    const loan = new Loan({
      loanName,
      lenderBank,
      totalAmount,
      remainingAmount,
      interestRate,
      startDate,
      endDate,
      repaymentDate,
      monthlyRepayment,
      repaymentBank,
      repaymentAccount,
      repaymentStartDate,
      userId: req.user.id
    });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 특정 대출 정보 수정 (PUT)
router.put('/:id', async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 특정 대출 정보 삭제 (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.status(204).end(); // No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
