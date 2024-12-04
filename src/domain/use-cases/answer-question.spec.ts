import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorID: '1',
    questionID: '1',
    content: 'Nova Resposta',
  })

  expect(answer.content).toBe('Nova Resposta')
})
