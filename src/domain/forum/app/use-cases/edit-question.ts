import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseResquest {
  authorID: string
  questionID: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    questionID,
    title,
    content,
  }: EditQuestionUseCaseResquest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('You are not the author of this question')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {}
  }
}
