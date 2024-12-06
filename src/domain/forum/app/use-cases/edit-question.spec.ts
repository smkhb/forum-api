import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question from the user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionID: 'question-1',
      authorID: 'author-1',
      title: 'edited title',
      content: 'edited content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'edited title',
      content: 'edited content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionID: 'question-1',
        authorID: 'author-2',
        title: 'edited title',
        content: 'edited content',
      })
    }).rejects.toThrowError('You are not the author of this question')
  })
})
