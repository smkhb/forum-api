import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseResquest {
  authorID: string
  answerID: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerID,
    authorID,
  }: DeleteAnswerUseCaseResquest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Question not found')
    }

    if (authorID !== answer.authorID.toString()) {
      throw new Error('You are not the author of this answer')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
