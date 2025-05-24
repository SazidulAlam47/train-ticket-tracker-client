import { useState, type Dispatch, type SetStateAction } from 'react';
import InputCount from './InputCount';
import StationInput from './StationInput';

type TScanningProps = {
    setShowTable: Dispatch<SetStateAction<boolean>>;
};

const Scanning = ({ setShowTable }: TScanningProps) => {
    const [inputCount, setInputCount] = useState(0);

    return (
        <>
            {inputCount ? (
                <StationInput
                    setShowTable={setShowTable}
                    inputCount={inputCount}
                    setInputCount={setInputCount}
                />
            ) : (
                <InputCount setInputCount={setInputCount} />
            )}
        </>
    );
};

export default Scanning;
