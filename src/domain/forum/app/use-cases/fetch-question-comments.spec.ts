import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Questions', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionID: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionID: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionID: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionID: new UniqueEntityID('question-1') }),
    )

    const { questionComments } = await sut.execute({
      questionID: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(4)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionID: new UniqueEntityID('question-1') }),
      )
    }

    const { questionComments } = await sut.execute({
      questionID: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(3)
  })
})
