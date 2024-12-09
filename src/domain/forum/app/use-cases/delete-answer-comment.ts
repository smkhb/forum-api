import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseResquest {
  authorID: string
  answerCommentID: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerCommentUseCaseResquest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findByID(answerCommentID)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorID.toString() !== authorID) {
      throw new Error('You cannot delete this comment')
    }

    await this.answerCommentsRepository.delete(answerComment)
    return {}
  }
}
