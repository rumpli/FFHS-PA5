package ch.quizinno.brainquest.mappers;

import ch.quizinno.brainquest.dtos.TopicDTO;
import ch.quizinno.brainquest.entities.Topic;
import ch.quizinno.brainquest.enums.Difficulty;
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
public class TopicMapperImpl implements TopicMapper {

    @Override
    public TopicDTO topicToTopicDTO(Topic topic, List<Difficulty> difficulty) {
        if ( topic == null && difficulty == null ) {
            return null;
        }

        TopicDTO.TopicDTOBuilder topicDTO = TopicDTO.builder();

        if ( topic != null ) {
            topicDTO.id( topic.getId() );
            topicDTO.name( topic.getName() );
            topicDTO.description( topic.getDescription() );
        }
        List<Difficulty> list = difficulty;
        if ( list != null ) {
            topicDTO.difficulty( new ArrayList<Difficulty>( list ) );
        }

        return topicDTO.build();
    }
}
