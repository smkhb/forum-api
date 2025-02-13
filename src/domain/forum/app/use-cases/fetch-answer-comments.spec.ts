import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Answers', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.execute({
      answerID: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(4)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerID: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })
})
