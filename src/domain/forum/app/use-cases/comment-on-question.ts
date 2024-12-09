import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprice/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseResquest {
  authorID: string
  questionID: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorID,
    questionID,
    content,
  }: CommentOnQuestionUseCaseResquest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorID: new UniqueEntityID(authorID),
      questionID: new UniqueEntityID(questionID),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}
