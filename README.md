# AI-Intervue

**AI-Intervue** is an interactive web-based interview platform built using Next.js. It leverages AI (Google Gemini) to generate customized interview questions based on user input. It also includes voice and video recording features for a more interactive experience, where candidates can record their responses to questions while the system keeps track of their audio and video.

## Project Flow

1. **Home Page**: 
   - The landing page introduces the platform and guides users to begin the interview process.
   - ![image](https://github.com/user-attachments/assets/26a9868d-e053-4e9f-b915-e88f00d7c0c4)


2. **Form Page**: 
   - Users fill in their details, such as:
     - **Position** they are applying for.
     - **Experience** level.
     - **Device Check** to ensure the camera and microphone are functional using the `getUserMedia` API.
       ![image](https://github.com/user-attachments/assets/e197fbe9-3bb3-43f8-9b79-bb30e5a316cc)
       ![image](https://github.com/user-attachments/assets/cf96fe64-7c4a-4be4-9315-537f90649691)



3. **Question Generation**:
   - Based on the details provided by the user, AI-powered by **Google Gemini** generates customized interview questions relevant to the position and experience level.
  
     ![image](https://github.com/user-attachments/assets/c9ddb711-7afb-4ede-8de1-d5b041648b81)


4. **Voice and Video Recording**:
   - The system allows users to listen to each question, record their audio responses, and video using their device’s camera.
   - The video and audio are captured every 30 seconds and sent to the backend for processing and storage.
   - ![image](https://github.com/user-attachments/assets/160ef304-2536-41f4-a732-dc4847853771)
   - ![image](https://github.com/user-attachments/assets/66104b46-cacf-4db1-8416-c24f177b23fe)



5. **Submission and Thank You Page**:
   - Once all questions have been answered and recorded, users submit their responses.
   - The system then directs the user to a **Thank You** page confirming the successful submission of their interview session.
   - ![image](https://github.com/user-attachments/assets/ccb52c13-0da2-4af5-8f9d-e57db91022d1)


## Features

- **Dynamic Question Generation**: 
  - AI-powered question generation based on user input like position and experience level.
  
- **Speech Synthesis**: 
  - The platform can speak the interview questions to enhance user interaction.
  
- **Audio and Video Recording**: 
  - Users can record their responses in both audio and video format. This is done every 30 seconds and is sent to the backend for storage and processing.
  
- **Device Check**: 
  - Ensures that the device's microphone and camera are working correctly using the `getUserMedia` API.

- **Seamless UI**: 
  - Simple and intuitive user interface for a smooth interview experience.

- **Backend Integration**: 
  - All audio and video files are uploaded to the backend for storage.

- **Thank You Page**: 
  - A confirmation page once the interview is completed.

## Technologies Used

- **Next.js**: For building the application with server-side rendering.
- **Google Gemini API**: For generating customized interview questions.
- **getUserMedia API**: For handling the device's camera and microphone access.
- **React**: For the frontend components.


## Setup Instructions

### Future Implementaions

- **Node.js** (v14 or higher)
- **MongoDB** (or any database for storing interview data)

### Steps to run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AI-Intervue.git
   cd AI-Intervue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the project and add your environment-specific variables like API keys and database connection strings.

4. Run the application:
   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

### Deployment

This project is ready for deployment on platforms like Vercel or Netlify. Simply connect your repository to the deployment platform and follow the instructions for deployment.

## Contributing

Feel free to open issues or pull requests for improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
