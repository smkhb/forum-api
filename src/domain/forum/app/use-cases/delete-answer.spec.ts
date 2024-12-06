import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer from the user', async () => {
    const newAnswer = makeAnswer(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerID: 'answer-1',
      authorID: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        answerID: 'answer-1',
        authorID: 'author-2',
      })
    }).rejects.toThrowError('You are not the author of this answer')
  })
})
