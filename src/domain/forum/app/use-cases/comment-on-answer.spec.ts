import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be to comment on answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorID: answer.authorID.toString(),
      answerID: answer.ID.toString(),
      content: 'This is a comment',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe(
      'This is a comment',
    )
  })
})
