import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteQuestionUseCaseResquest {
  authorID: string
  questionID: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionID,
    authorID,
  }: DeleteQuestionUseCaseResquest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== question.authorID.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
