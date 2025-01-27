package ch.quizinno.brainquest.mappers;

import ch.quizinno.brainquest.dtos.CorrectQuestionDTO;
import ch.quizinno.brainquest.dtos.QuizAnswerDTO;
import ch.quizinno.brainquest.dtos.QuizQuestionDTO;
import ch.quizinno.brainquest.entities.Answer;
import ch.quizinno.brainquest.entities.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-11T09:12:42+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.10.2.jar, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public QuizQuestionDTO questionToQuizQuestionDTO(Question question, List<QuizAnswerDTO> answers) {
        if ( question == null && answers == null ) {
            return null;
        }

        QuizQuestionDTO.QuizQuestionDTOBuilder quizQuestionDTO = QuizQuestionDTO.builder();

        if ( question != null ) {
            quizQuestionDTO.id( question.getId() );
            quizQuestionDTO.question( question.getQuestion() );
            quizQuestionDTO.difficulty( question.getDifficulty() );
            quizQuestionDTO.topic( question.getTopic() );
        }
        List<QuizAnswerDTO> list = answers;
        if ( list != null ) {
            quizQuestionDTO.answers( new ArrayList<QuizAnswerDTO>( list ) );
        }

        return quizQuestionDTO.build();
    }

    @Override
    public QuizAnswerDTO answerToQuizAnswerDTO(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        QuizAnswerDTO.QuizAnswerDTOBuilder quizAnswerDTO = QuizAnswerDTO.builder();

        quizAnswerDTO.id( answer.getId() );
        quizAnswerDTO.answer( answer.getAnswer() );

        return quizAnswerDTO.build();
    }

    @Override
    public CorrectQuestionDTO questionToCorrectQuestionDTO(Question question, boolean correct, Answer correctAnswer) {
        if ( question == null && correctAnswer == null ) {
            return null;
        }

        CorrectQuestionDTO.CorrectQuestionDTOBuilder correctQuestionDTO = CorrectQuestionDTO.builder();

        if ( question != null ) {
            correctQuestionDTO.id( question.getId() );
            correctQuestionDTO.info( question.getInfo() );
        }
        if ( correctAnswer != null ) {
            if ( correctAnswer.getId() != null ) {
                correctQuestionDTO.correctAnswerId( correctAnswer.getId().intValue() );
            }
        }
        correctQuestionDTO.correct( correct );

        return correctQuestionDTO.build();
    }
}
