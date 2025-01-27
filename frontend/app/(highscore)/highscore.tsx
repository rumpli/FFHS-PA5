import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";

// Components
import ErrorBoundary from '@/components/ErrorBoundary';
import SmallTopBar from '@/components/SmallTopBar';
import ErrorView from "@/components/ErrorView";
import HighscoreTable from "@/components/HighscoreTable";
import OperationStatus from "@/components/OperationStatus"

// Utils
import { handleOperationSuccess } from '@/utils/handleOperationSuccess';
import { handleFetchHighscores } from '@/utils/handleFetchHighscores';
import { handleFetchTopics } from "@/utils/handleFetchTopics";
import log from '@/utils/logger';

// Styles
import ButtonStyles from '@/styles/ButtonStyles';
import TextStyles from '@/styles/TextStyles';
import SiteStyles from '@/styles/SiteStyles';
import { usePickerStyles } from "@/styles/PickerStyles";

// Hooks
import { usePlatformStyles } from "@/hooks/usePlatformStyles";

/**
 * Main component for the main screen of the application.
 * @returns {JSX.Element} The rendered component.
 */
export default function Index() {
    const PickerStyles = usePickerStyles();
    const { platform } = usePlatformStyles();
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [isSlow, setIsSlow] = useState(false);
    const [highscores, setHighscores] = useState<any[]>([]);
    const [operationSucceeded, setOperationSucceeded] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const isButtonDisabled = !selectedTopic || !selectedDifficulty;
    const selectedTopicId = selectedTopic ? topics.find(t => t.name === selectedTopic)?.id : null;

    /**
     * Loads the topics by fetching them from the server.
     */
    const loadTopics = () => {
        setTopics([]);
        setIsSlow(false); // Reset "slow" state before starting the game
        setOperationSucceeded(false); // Reset the operation status
        handleFetchTopics(setTopics, setLoading, setError, setIsSlow);
    };

    /**
     * Fetches the highscores based on the selected topic and difficulty.
     */
    const getHighscores = () => {
        setHighscores([]);
        setIsSlow(false); // Reset "slow" state before starting the game
        setOperationSucceeded(false); // Reset the operation status
        handleFetchHighscores(setHighscores, setLoadingTable, setError, setIsSlow, selectedTopicId, selectedDifficulty, 'SCORE', 'DESC');
    }

    /**
     * Handles the change of the selected topic.
     * @param {string} itemValue - The value of the selected topic.
     */
    const handleTopicChange = (itemValue: string) => {
        setSelectedTopic(itemValue);
        const topic = topics.find(t => t.name === itemValue);
        const newDifficulties = topic ? topic.difficulty : [];
        setDifficulties(newDifficulties);
        if (!newDifficulties.includes(selectedDifficulty)) {
            setSelectedDifficulty('');
        }
    };

    useEffect(() => {
        loadTopics();
    }, []);

    useEffect(() => {
        if ((isSlow && topics.length > 0 && highscores.length < 0) || (isSlow && highscores.length > 0)) {
            log.debug('API call succeeded after a delay.');
            // If topics or highscores are fetched successfully and `isSlow` is true, show success
            handleOperationSuccess(setOperationSucceeded, setIsSlow);
        }
    }, [isSlow, topics, highscores]);

    if (error) {
        const errorMessage = `Error: ${error.message}`;
        return <ErrorView errorMessage={errorMessage} onPress={() => router.push('/')} />;
    }

    return (
        <ErrorBoundary fallback={<Text>Something went wrong. Please try again later.</Text>}>
            <ScrollView style={SiteStyles.fullSite}>
                <View style={SiteStyles.container}>
                    <SmallTopBar/>
                    <View style={SiteStyles.highscoreContainer}>
                        { loading ? (
                            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                { isSlow && (
                                    <OperationStatus operationSucceeded={operationSucceeded}/>
                                )}
                            </View>
                        ) : (
                            <View style={platform === 'web' ? SiteStyles.row : SiteStyles.column}>
                                <View style={PickerStyles.pickSelection}>
                                    <Text style={TextStyles.normalText}>Themenbereich</Text>
                                    <Picker
                                        selectedValue={selectedTopic || ''}
                                        style={PickerStyles.picker}
                                        onValueChange={(itemValue) => handleTopicChange(itemValue)}
                                    >
                                        <Picker.Item label="-" value="" />
                                        {topics.map((topic, index) => (
                                            <Picker.Item key={index} label={topic.name} value={topic.name} />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={PickerStyles.pickSelection}>
                                    <Text style={TextStyles.normalText}>Schwierigkeit</Text>
                                    <Picker
                                        selectedValue={selectedDifficulty || ''}
                                        style={PickerStyles.picker}
                                        onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
                                    >
                                        { selectedTopic ? (
                                            <Picker.Item label="-" value="" />
                                        ) : (
                                            <Picker.Item label="Ein Thema muss selektiert sein" value={null} />
                                        )}
                                        {difficulties.map((difficulty, index) => (
                                            <Picker.Item key={index} label={difficulty} value={difficulty} />
                                        ))}
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={[ButtonStyles.button, isButtonDisabled && ButtonStyles.disabledButton]}
                                    onPress={() => getHighscores()}
                                    disabled={isButtonDisabled}
                                >
                                    <Text style={ButtonStyles.buttonText}>Anzeigen</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        { loadingTable || (operationSucceeded && !loading) ? (
                            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                { isSlow && (
                                    <OperationStatus operationSucceeded={operationSucceeded}/>
                                )}
                            </View>
                        ) : (
                            <HighscoreTable highscores={highscores}/>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ErrorBoundary>
    );
}