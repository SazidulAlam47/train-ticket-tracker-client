import InputCount from './InputCount';
import StationInput from './StationInput';
import useTicketContext from '@/hooks/useTicketContext';

const Scanning = () => {
    const { inputCount } = useTicketContext();
    return <>{inputCount ? <StationInput /> : <InputCount />}</>;
};

export default Scanning;
