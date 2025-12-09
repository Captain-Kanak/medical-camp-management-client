# 👨‍⚕️ Medical Camp Management

A comprehensive full-stack platform designed to facilitate the seamless **organization, management, and registration** for various medical camps. The application serves two primary user types: **Organizers** who manage the camp details, and **Participants** who register to attend the camps.

---

## 🚀 Live Demo & Repository

| Type | Link |
| :--- | :--- |
| **Live Site** | [https://medical-camp-management-f1b2a.web.app/](https://medical-camp-management-f1b2a.web.app/) |
| **Client Repository** | [https://github.com/Captain-Kanak/medical-camp-management-client](https://github.com/Captain-Kanak/medical-camp-management-client) |
| **Server Repository** | *[https://github.com/Captain-Kanak/medical-camp-management-server](https://github.com/Captain-Kanak/medical-camp-management-server) |

---

## ✨ Key Features

### General Features

* **Responsive Design:** Fully optimized for viewing on desktops, tablets, and mobile devices.
* **Secure Authentication:** User login and registration using modern authentication methods (e.g., Firebase Auth or JWT).
* **Role-Based Access Control:** Separate dashboards and functionalities for **Organizers** and general **Participants**.
* **Camp Search & Filtering:** Users can easily find relevant camps by name, date, location, or specialized service.

### Organizer Features

* **Camp Creation:** Organizers can add new medical camps, providing details like name, date, time, location, specialized services, and professional attendance.
* **Camp Update/Deletion:** Full CRUD (Create, Read, Update, Delete) functionality for managing existing camp listings.
* **Participant Management:** View the list of registered participants for each organized camp.
* **Analytics/Reports:** Track key metrics such as total camps, total participants, and upcoming events.

### Participant Features

* **Camp Registration:** Users can register for a camp, which may involve payment processing.
* **User Dashboard:** A personalized dashboard to view all registered camps and manage profile information.
* **Feedback/Reviews:** Ability to submit reviews or feedback on attended medical camps.

---

## 💻 Technologies Used

### Client-Side (Frontend)

| Technology | Description |
| :--- | :--- |
| **React/Vite** | For building a fast, modern, and component-based user interface. |
| **React Router DOM** | For seamless navigation and routing within the single-page application. |
| **Tailwind CSS / DaisyUI** | A utility-first CSS framework for rapid and customizable styling. |
| **Axios** | A promise-based HTTP client for making API requests to the server. |

### Server-Side (Backend - *Assumption*)

| Technology | Description |
| :--- | :--- |
| **Node.js & Express.js** | A powerful runtime environment and framework for building RESTful APIs. |
| **MongoDB / Mongoose** | A NoSQL database for flexible and scalable data storage. |
| **JWT (JSON Web Tokens)** | For secure, state-less authentication and authorization. |
| **Stripe/SSLCommerz** | For handling payment processing during camp registration. |

---

## 🛠️ Installation and Setup

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (or yarn/pnpm)
* A running instance of the **Server-Side API** (assuming a separate backend project).

### 1. Clone the repository

```bash
git clone [https://github.com/Captain-Kanak/medical-camp-management-client.git](https://github.com/Captain-Kanak/medical-camp-management-client.git)
cd medical-camp-management-client
