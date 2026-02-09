<div align="center">
  <img src="https://ui-avatars.com/api/?name=Admin+Dash&background=4f46e5&color=fff&size=128&rounded=true" alt="AdminDash Logo" width="100"/>
  <h1>AdminDash 🚀</h1>
  <p>A Modern, High-Performance Admin Dashboard built with React & Vite.</p>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TanStack Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

  <br />

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 📖 About

**AdminDash** is a fully functional admin dashboard template designed for scalability and performance. It features a responsive layout, dark mode support, real-time data visualization with charts, and comprehensive data management tables (Users, Products, Orders) powered by server-side logic (sorting, filtering, pagination).

The backend simulation is handled via **DummyJSON**, providing a realistic API interaction experience without setting up a server.

---

## ✨ Features

### 🎨 **UI & UX**

- **Modern Design**: Clean, glassmorphic aesthetics with a focus on usability.
- **Dark Mode 🌙**: Fully implemented dark mode toggle for comfortable viewing.
- **Responsive Layout 📱**: Optimized for desktop, tablet, and mobile devices.
- **Interactive Charts 📊**: Dynamic visualizations using Recharts/ApexCharts.

### 🔐 **Authentication & Security**

- **Secure Login**: JWT-based authentication flow.
- **Role-Based Access**: Specialized views and permissions for Admin roles.
- **Persistent Session**: Automatic token management and session restoration.

### 🛠 **Data Management**

- **Advanced Tables**: Custom `DataTable` component with:
  - ✅ **Debounced Search**: Optimized search reducing API calls.
  - 🔽 **Server-Side Sorting**: Efficiently sort large datasets.
  - 🏷️ **Dynamic Filtering**: Filter by categories, roles, and more.
  - 📄 **Pagination**: Seamless navigation through data pages.
  - ✏️ **Inline Editing**: Quick updates directly within the table rows.
  - 🗑️ **Bulk Actions**: Select and delete multiple items at once.

### 🧩 **App Modules**

- **Dashboard**: Overview of key metrics (Sales, Users, Orders).
- **Users**: Manage customer accounts with detailed profiles.
- **Products**: Inventory management with stock tracking.
- **Orders**: Order processing and status updates.

---

## 💻 Tech Stack

| Category          | Technology       | Description                            |
| :---------------- | :--------------- | :------------------------------------- |
| **Frontend**      | React 18         | Component-based UI library             |
| **Build Tool**    | Vite             | Lightning-fast frontend tooling        |
| **Styling**       | Tailwind CSS     | Utility-first CSS framework            |
| **State**         | Redux Toolkit    | Centralized state management           |
| **Data Fetching** | TanStack Query   | Server state synchronization & caching |
| **Routing**       | React Router 6   | Client-side navigation                 |
| **Charts**        | React ApexCharts | Interactive data visualization         |
| **Icons**         | Lucide React     | Clean, consistent icon set             |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdallah-Younes10/AdminDash.git
   cd AdminDash
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` to view the app.

---

## 📂 Project Structure

```bash
AdminDash/
├── src/
│   ├── assets/          # Static assets (images, logos)
│   ├── Components/      # Reusable UI components
│   │   ├── AccordionTable/  # Powerful data table module
│   │   ├── Charts/          # Visualization components
│   │   ├── Home/            # Dashboard widgets
│   │   └── Layout/          # Layout wrappers (Sidebar, Navbar)
│   ├── DashboardLogic/  # API services & helpers
│   ├── Redux/           # Global state slices (Auth, UI)
│   ├── App.jsx          # Main application entry
│   └── main.jsx         # DOM rendering
├── public/              # Public static files
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve **AdminDash**, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Abdallah-Younes10">Abdallah Younes</a></p>
</div>
