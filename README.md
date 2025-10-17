# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


 Slot-management

A React + Bootstrap UI for managing storage boxes and slots. This repository contains a front-end prototype that demonstrates user authentication (mocked), role-based routing, slot/box management UI, audit history, analytics, and a modern theme.

---

## Features

- Role-based dashboards for `admin`, `manager`, and `user`.
- Mock authentication with quick-login credentials.
- Box & slot listing, add/view item modal, status indicators (available / occupied / returnable).
- User registration demo and admin approval flow UI.
- Activity history timeline with filtering and export action.
- Analytics and summary cards.
- Theme context that persists theme choice to localStorage.
- Responsive layout using React-Bootstrap components.

---


Open http://localhost:3000
The app entry is src/index.js. Routes and role-based dashboard selection live in src/App.js — see the DashboardRouter helper.

Mock credentials
Authentication is mocked in the context provider at AuthProvider. Use these credentials for quick testing:

Admin: admin@slot.com / password123
Manager: manager@slot.com / password123
User: user@slot.com / password123
The mock login stores a token and user in localStorage and navigates to /dashboard.

See: src/context/AuthContext.jsx

Main concepts & architecture
Context providers

Authentication: AuthProvider provides login, logout, register, hasRole, and user.
Theming: ThemeProvider toggles and persists dark/light mode.
Routing

App routes and protected routes are declared in src/App.js.
Role-based protection uses ProtectedRoute.
Components

Global layout: src/components/common/Navbar.jsx, src/components/common/Footer.jsx
Dashboards:
Admin: src/components/dashboard/AdminDashboard.jsx
Manager: src/components/dashboard/ManagerDashboard.jsx
User: src/components/dashboard/UserDashboard.jsx
Slots:
Box view: src/components/slots/BoxView.jsx
Slot grid: src/components/slots/SlotGrid.jsx
Slot card: src/components/slots/SlotCard.jsx
Slot modal: src/components/slots/SlotModal.jsx
Users & Admin:
User management UI: src/components/users/UserManagement.jsx
History & Analytics:
History timeline: src/components/history/HistoryLog.jsx
Analytics: src/components/analytics/Analytics.jsx
Styling

Global and component styles are in src/styles/App.css and src/styles/modern-theme.css.
Bootstrap v5 is used; components are from react-bootstrap.
Project structure (important files)
src/index.js — React entrypoint.
src/App.js — Router, layout, Toast container, Theme/Auth providers.
src/context/AuthContext.jsx — Mock auth.
src/context/ThemeContext.jsx — Theme persistence.
src/components/common/Navbar.jsx — Top nav (renders only when logged in).
src/components/common/ProtectedRoute.jsx — Role protection.
src/components/slots/ — Box & slot UI.
src/components/users/UserManagement.jsx — Admin user approvals.
src/components/history/HistoryLog.jsx — Activity timeline.
src/components/analytics/Analytics.jsx — Summary & charts demo.
src/styles/modern-theme.css — Theme and component visuals.
public/index.html — HTML template.
How the code works (high level)
Authentication:

login in AuthProvider checks the provided email against a small mock user map and validates a fixed password password123. On success it saves token and user to localStorage and navigates to /dashboard.
logout clears localStorage and navigates to /login.
Routing:

Public routes: /login, /register.
Protected routes: /dashboard, /boxes, /users (admin only), /history, /analytics (admin/manager).
ProtectedRoute inspects the user from AuthProvider and the allowedRoles prop and either renders children or shows an access denied message / redirect.
Slots:

BoxView.jsx generates mock slots for each box and delegates rendering to SlotGrid.jsx.
Clicking a slot opens SlotModal.jsx in add or details mode depending on slot status.
Users:

UserManagement.jsx holds local arrays for pendingUsers and approvedUsers. Approve/Reject actions update local state and show toast notifications.
History & Analytics:

Each is a UI-only demo with mocked data and filtering. The export action triggers a toast.
Development notes & suggestions
Replace mock auth with real API endpoints and proper token handling.
Persist boxes/slots/users to a backend and fetch in components instead of generating mock data.
Add unit/integration tests for context providers and major components.
Consider central state management (e.g., React Query / Redux) when adding server data.
Accessibility: verify ARIA attributes for modals and interactive controls.
Contributing
Fork and branch.
Follow existing code style (React + JSX + React-Bootstrap).
Run npm install and npm start to test changes.
Open a PR with a concise description.                       
