import express from 'express';
import Quiz from '../Models/Quiz';

const router = express.Router();

const updateQuizStatus = async () => {
  const currentTime = new Date();

  await Quiz.updateMany(
    { status: 'inactive', startDate: { $lte: currentTime }, endDate: { $gte: currentTime } },
    { status: 'active' }
  );

  await Quiz.updateMany(
    { status: 'active', endDate: { $lt: currentTime } },
    { status: 'finished' }
  );

  await Quiz.updateMany(
    { startDate: { $gt: currentTime } },
    { status: 'inactive' }
  );
};

router.post('/quiz', async (req, res) => {
  try {
    const quizzes = Array.isArray(req.body) ? req.body : [req.body];
    await Quiz.insertMany(quizzes);
    res.status(201).json({ message: 'Quizzes created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating quizzes' });
  }
});

router.get('/active', async (req, res) => {
  try {
    await updateQuizStatus();
    const activeQuizzes = await Quiz.find({ status: 'active' });
    res.json(activeQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching active quizzes' });
  }
});

router.get('/result', async (req, res) => {
  try {
    const quizId = req.query.id; 
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz || quiz.status !== 'finished') {
      return res.status(404).json({ error: 'Quiz not found or not finished yet' });
    }
    
    res.json({ result: quiz.rightAnswer });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quiz result' });
  }
});

router.get('/all', async (req, res) => {
  try {
    await updateQuizStatus();
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all quizzes' });
  }
});

export default router;
