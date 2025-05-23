import { Button } from './components/ui/button';
import TicketTable from './components/common/TicketTable';

const App = () => {
    return (
        <div>
            <p>This is App</p>
            <Button>Click me</Button>
            <TicketTable />
        </div>
    );
};

export default App;
