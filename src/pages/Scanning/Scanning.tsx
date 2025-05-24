import { useState, type Dispatch, type SetStateAction } from 'react';
import InputCount from './InputCount';

type TScanningProps = {
    setShowTable: Dispatch<SetStateAction<boolean>>;
};

const Scanning = ({ setShowTables }: TScanningProps) => {
    const [inputCount, setInputCount] = useState(0);
    console.log(inputCount);
    return (
        <div>
            {inputCount ? (
                <p>coming</p>
            ) : (
                <InputCount setInputCount={setInputCount} />
            )}
        </div>
    );
};

export default Scanning;
