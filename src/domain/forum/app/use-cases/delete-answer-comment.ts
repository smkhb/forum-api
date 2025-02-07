import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseResquest {
  authorID: string
  answerCommentID: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerCommentUseCaseResquest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findByID(answerCommentID)

    if (!answerComment) {
      return left('Answer comment not found')
    }

    if (answerComment.authorID.toString() !== authorID) {
      return left('Unauthorized')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
