import { QuestionAttachmentsRepository } from '@/domain/forum/app/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprice/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  async findManyByQuestionID(questionID: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionID.toString() === questionID,
    )
    return questionAttachments
  }

  async deleteManyByQuestionID(questionID: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionID.toString() !== questionID,
    ) // remove all attachments from the question

    this.items = questionAttachments
  }

  public items: QuestionAttachment[] = []
}
