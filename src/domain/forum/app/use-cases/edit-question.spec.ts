import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })

  it('should be able to edit a question from the user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionID: newQuestion.ID,
        attachmentID: new UniqueEntityID('1'),
      }),
    )
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionID: newQuestion.ID,
        attachmentID: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      questionID: 'question-1',
      authorID: 'author-1',
      title: 'edited title',
      content: 'edited content',
      attachmentsIDs: ['1', '3'],
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'edited title',
      content: 'edited content',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentID: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentID: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionID: 'question-1',
      authorID: 'author-2',
      title: 'edited title',
      content: 'edited content',
      attachmentsIDs: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
