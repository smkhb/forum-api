import { AnswerAttachmentsRepository } from '@/domain/forum/app/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprice/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  async findManyByAnswerID(answerID: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerID.toString() === answerID,
    )
    return answerAttachments
  }

  async deleteManyByAnswerID(answerID: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerID.toString() !== answerID,
    ) // remove all attachments from the answer

    this.items = answerAttachments
  }

  public items: AnswerAttachment[] = []
}
