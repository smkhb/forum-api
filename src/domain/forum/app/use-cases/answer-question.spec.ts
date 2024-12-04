import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionID: '1',
      instructorID: '1',
      content: 'answer content',
    })

    expect(answer.ID).toBeTruthy()
    expect(answer.content).toEqual('answer content')
    expect(inMemoryAnswersRepository.items[0].ID).toEqual(answer.ID)
  })
})
