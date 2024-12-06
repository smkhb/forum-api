import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-01-01') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-01-02') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-01-03') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-01-04') }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2024-01-04') }),
      expect.objectContaining({ createdAt: new Date('2024-01-03') }),
      expect.objectContaining({ createdAt: new Date('2024-01-02') }),
      expect.objectContaining({ createdAt: new Date('2024-01-01') }),
    ])
  })

  it('should be able to paginated recent questions', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date() }),
      )
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(3)
  })
})
