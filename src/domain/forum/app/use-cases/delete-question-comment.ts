import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseResquest {
  authorID: string
  questionCommentID: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorID,
    questionCommentID,
  }: DeleteQuestionCommentUseCaseResquest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findByID(questionCommentID)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorID.toString() !== authorID) {
      throw new Error('You cannot delete this comment')
    }

    await this.questionCommentsRepository.delete(questionComment)
    return {}
  }
}
