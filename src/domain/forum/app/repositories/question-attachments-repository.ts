import { QuestionAttachment } from '../../enterprice/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionID(questionID: string): Promise<QuestionAttachment[]>
}
