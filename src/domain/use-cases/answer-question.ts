import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseResquest {
  instructorID: string;
  questionID: string;
  content: string;
}

export class AnswerQuestionUseCase{
  constructor(private answerRepositoru: AnswerRepository){}

  async execute({instructorID, questionID, content}: AnswerQuestionUseCaseResquest){
    const answer = new Answer({
      content,
      authorID: instructorID,
      questionID
    });

    await this.answerRepositoru.create(answer);
    return answer
  }
}