import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprice/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'

interface CreateQuestionUseCaseResquest {
  authorID: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    title,
    content,
  }: CreateQuestionUseCaseResquest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorID: new UniqueEntityID(authorID),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
