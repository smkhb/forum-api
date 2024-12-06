import { Answer } from '../../enterprice/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseResquest {
  authorID: string
  answerID: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorID,
    answerID,
    content,
  }: EditAnswerUseCaseResquest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorID !== answer.authorID.toString()) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
