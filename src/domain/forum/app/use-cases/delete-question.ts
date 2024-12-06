import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseResquest {
  authorID: string
  questionID: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionID,
    authorID,
  }: DeleteQuestionUseCaseResquest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('You are not the author of this question')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
