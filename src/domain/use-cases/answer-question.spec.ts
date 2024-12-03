import { test, expect } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorID: '1',
    questionID: '1',
    content: 'Nova Resposta'
  })

  expect(answer.content).toBe('Nova Resposta')
})