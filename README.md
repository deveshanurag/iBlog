
# iBlog

A fully functional and dynamic blog platform designed to share diverse content ranging from history and science to poetry and personal stories. The platform allows users to explore interesting articles, gain knowledge, and spark curiosity.



---

## Features

- **User Authentication:**
  - Login and Sign-up functionality using **JWT authentication** for secure access.

- **Blog Management:**
  - Write blogs with **category**, **title**, **content**, and **tags**.
  - Edit or delete blogs with ease.

- **Comment System:**
  - Read and engage with blogs by leaving comments.
  - Edit or delete your comments for better interaction.

- **Search Functionality:**
  - Quickly find blogs using keywords.

- **Pagination:**
  - Efficiently browse through a large number of blogs with a seamless pagination system.

- **Responsive Design:**
  - Fully optimized for desktops, tablets, and mobile devices.

- **Interactive UI:**
  - Built with a user-friendly design using **React** and styled with **Tailwind CSS**.

---
## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JSON Web Tokens (JWT)  
- **Hosting:** Render  
- **Package Manager:** npm  
## Installation

Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js installed on your machine.
- MongoDB connection string for the database.

### Steps
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/deveshanurag/iBlog.git
   cd iBlog
   ```

2. **Install dependencies for the backend:**  
   ```bash
   npm install
   ```

3. **Set up environment variables for the backend:**  
   Create a `.env` file in the `backend` directory and add the following:  
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Start the backend server:**  
   ```bash
   npm start
   ```

5. **Install dependencies for the frontend:**  
   Navigate to the `frontend` directory:  
   ```bash
   cd frontend
   npm install
   ```

6. **Start the frontend development server:**  
   ```bash
   npm start
   ```

7. **Access the application:**  
   Open your browser and navigate to `http://localhost:3000`.

## Demo

Demo Video:(open in incognito window)

https://drive.google.com/file/d/1Bufr5Q7LgqGZFjN2H6hRjBEB7Q0SqP3c/view?usp=sharing


Live Website:


https://iblog-54fh.onrender.com


## Future Scope

1. **Enhanced Blog Features:**  
   - Enable adding images to blogs for a richer content experience.  
   - Replace the current editor with a rich text editor to allow formatting like bold, headings, and embedded media.

2. **Advanced Search and Filtering:**  
   Improve search functionality with filters for categories, tags, dates, and keywords to help users find relevant content easily.

3. **Mobile Application Development:**  
   Build a mobile app for seamless access and usability on various devices.

4. **Social Media and Notification Integration:**  
   Allow social sharing of blogs and integrate real-time notifications for comments, likes, and new blog updates.

5. **User Personalization and Analytics:**  
   - Provide personalized blog recommendations based on user interests and reading history.  
   - Add blog analytics for authors, showing views, engagement, and performance insights.  
## Contributing

Contributions are always welcome!

