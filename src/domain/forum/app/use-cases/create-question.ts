import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprice/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseResquest {
  authorID: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

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

    return { question }
  }
}
