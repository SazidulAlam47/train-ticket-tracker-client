import { useState } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import Autosuggest from 'react-autosuggest';
import type { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import './AutoSuggestionInput.css';
import { citiesOptions } from '@/constants/searchCities';
import type { TStation } from '@/types/station.type';

const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    return citiesOptions.filter((suggestion) =>
        suggestion.name.toLowerCase().startsWith(inputValue),
    );
};
const getSuggestionValue = (suggestion: TStation) => suggestion.name;
const renderSuggestion = (suggestion: TStation) => <div>{suggestion.name}</div>;

type TAutoSuggestionInputProps = {
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};

const AutoSuggestionInput = ({
    placeholder,
    value,
    setValue,
}: TAutoSuggestionInputProps) => {
    const [suggestionsList, setSuggestionsList] = useState<TStation[]>([]);

    const onChange = (
        event: FormEvent<HTMLElement>,
        { newValue }: { newValue: string },
    ) => {
        event.preventDefault();
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({
        value,
    }: SuggestionsFetchRequestedParams) => {
        setSuggestionsList(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestionsList([]);
    };

    return (
        <Autosuggest
            suggestions={suggestionsList}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
                placeholder,
                value,
                onChange,
            }}
        />
    );
};

export default AutoSuggestionInput;
