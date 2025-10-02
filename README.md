# Train Ticket Tracker Frontend

Train Ticket Tracker is a tool designed to track ticket availability on the Bangladesh Railway eTicket platform. It checks for ticket availability every 30 seconds and provides notifications when tickets become available.

Many of us prefer train travel for long-distance journeys. But the problem arises when all tickets are sold out online. However, if someone cancels their ticket, it becomes available again. The only way to get that ticket is to keep refreshing the page manually, as the eTicket platform does not update ticket availability in real time. This process is frustrating and time-consuming. Train Ticket Tracker automates this process, making it easier to secure newly available tickets!

## Features

- **Automated Ticket Checking:** Monitors the Bangladesh Railway eTicket platform every 15 seconds for ticket availability.
- **Notifications:** Instantly notifies users when tickets become available.
- **User-Friendly Interface:** Simple and intuitive web interface to manage your tracking preferences.
- **Search and Manage:** Search for routes, date and see ticket status in real-time.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.

## Tech Stack

- Frontend: React 19
- Build Tool: Vite
- Styling: Tailwind CSS, clsx, tailwind-merge, tw-animate-css
- UI Components: Radix UI, lucide-react
- Date/Time: date-fns, moment-timezone
- Form Handling: react-hook-form
- Autocomplete: react-autosuggest
- HTTP Client: axios
- Notifications: react-hot-toast
- Icons: react-icons
- Type Checking: TypeScript
- Linting/Formatting: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SazidulAlam47/train-ticket-tracker-client.git
    cd train-ticket-tracker-client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    ```bash
    cp .env.example .env
    ```

    Then update the `.env` file with your configuration:

    ```env
    VITE_API_URL=http://localhost:5000/api/v1
    ```

### Building for Production

```bash
npm run build
```

### Running the App

Start the development server:

```bash
npm start
```

Visit [http://localhost:4173](http://localhost:4173) in your browser.

## Configuration

- Configure API endpoint and environment variables in the `.env` file if required.
- Make sure to connect this client with the appropriate backend service.

## Backend

You can find the backend repository here:  
[train-ticket-tracker-server](https://github.com/SazidulAlam47/train-ticket-tracker-server)

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/SazidulAlam47/train-ticket-tracker-client/issues).
