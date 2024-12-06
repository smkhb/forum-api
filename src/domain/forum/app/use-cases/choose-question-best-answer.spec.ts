import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionID: question.ID,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerID: answer.ID.toString(),
      authorID: question.authorID.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerID).toBe(answer.ID)
  })

  it('should not be able to delete a answer from another user', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionID: question.ID,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await expect(() => {
      return sut.execute({
        answerID: answer.ID.toString(),
        authorID: 'wrong-author-2',
      })
    }).rejects.toThrowError('You are not the author of this question')
  })
})
