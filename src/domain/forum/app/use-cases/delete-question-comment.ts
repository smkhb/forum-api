import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionCommentUseCaseResquest {
  authorID: string
  questionCommentID: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorID,
    questionCommentID,
  }: DeleteQuestionCommentUseCaseResquest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findByID(questionCommentID)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorID.toString() !== authorID) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)
    return right({})
  }
}
