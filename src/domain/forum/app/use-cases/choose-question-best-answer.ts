import { Question } from '../../enterprice/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface ChooseQuestionBestAnswerUseCaseResquest {
  authorID: string
  answerID: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    authorID,
    answerID,
  }: ChooseQuestionBestAnswerUseCaseResquest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findByID(
      answer.questionID.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('You are not the author of this question')
    }

    question.bestAnswerID = answer.ID

    await this.questionsRepository.save(question)

    return { question }
  }
}
