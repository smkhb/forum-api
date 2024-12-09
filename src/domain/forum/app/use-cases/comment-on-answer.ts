import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprice/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface CommentOnAnswerUseCaseResquest {
  authorID: string
  answerID: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorID,
    answerID,
    content,
  }: CommentOnAnswerUseCaseResquest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorID: new UniqueEntityID(authorID),
      answerID: new UniqueEntityID(answerID),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
