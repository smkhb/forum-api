import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorID: '1',
      title: 'question title',
      content: 'question content',
    })

    expect(question.ID).toBeTruthy()
    expect(question.content).toEqual('question content')
    expect(inMemoryQuestionsRepository.items[0].ID).toEqual(question.ID)
  })
})
