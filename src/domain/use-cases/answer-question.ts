import { UniqueEntityID } from "@/core/entities/unique-entity-id";
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
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID)
    });

    await this.answerRepositoru.create(answer);
    return answer
  }
}