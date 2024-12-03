import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseResquest {
  instructorID: string;
  questionID: string;
  content: string;
}

export class AnswerQuestionUseCase{
  execute({instructorID, questionID, content}: AnswerQuestionUseCaseResquest){
    const answer = new Answer({
      content,
      authorID: instructorID,
      questionID
    });

    return answer
  }
}