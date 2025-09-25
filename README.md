
<h1>
  <img 
    src="https://res.cloudinary.com/ddcdrrav8/image/upload/v1758786565/Screenshot_2025-09-25_131603-Picsart-AiImageEnhancer_w6gdy8.png" 
    alt="🧠 PromptMania" 
    width="280"
  >
</h1>


  <p>
    <strong>PromptMania</strong> is a full-stack web platform where users can post, store, and explore powerful 
    <strong>ChatGPT prompts</strong>. It’s a community-driven hub for prompt engineers, writers, coders, students, and AI enthusiasts.
  </p>

  <p>🔗 <a href="https://github.com/blackcat-007/promptmania" target="_blank">GitHub Repository</a></p>

  <h2>🚀 Features</h2>
  <ul>
    <li>📌 Post and save ChatGPT,Gemini,Perplexity,Grok prompts for future reuse</li>
 <li>💡 Get prompts to generate videos, photos, and other desired results for social media posts or project work, powered by a large collection of prompts.</li>
    <li>🔍 Full-text search by <strong>tag, keyword, or author</strong></li>
    <li>✂️ One-click copy for any prompt</li>
    <li>👤 Personal profile page showing user's posts</li>
    <li>🔐 JWT-based Google OAuth authentication via <code>NextAuth.js</code></li>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Layer</th>
        <th>Technology</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Frontend</td>
        <td>Next.js (App Router)</td>
        <td>Modern React framework for UI + SSR</td>
      </tr>
      <tr>
        <td>Styling</td>
        <td>Tailwind CSS</td>
        <td>Utility-first responsive styling</td>
      </tr>
      <tr>
        <td>Authentication</td>
        <td>NextAuth + JWT + Google OAuth</td>
        <td>Secure login with token-based session</td>
      </tr>
      <tr>
        <td>Database</td>
        <td>MongoDB Atlas</td>
        <td>NoSQL DB for storing prompts and users</td>
      </tr>
      <tr>
        <td>ORM</td>
        <td>Mongoose</td>
        <td>Object modeling for MongoDB</td>
      </tr>
    </tbody>
  </table>

  <h2>🗂 Project Structure</h2>
  <pre>
promptmania/
├── app/
│   ├── page.tsx                  # Landing/Home page
│   ├── profile/                  # User profile view
│   ├── prompt/[id]/             # Individual prompt detail view
│   ├── create-prompt/           # Create new prompt page
│   └── api/                     # Backend API routes
├── components/                  # Reusable UI components
├── lib/                         # MongoDB connection & helpers
├── models/                      # Mongoose models (User, Prompt)
├── public/                      # Static assets
└── README.html                  # This file
  </pre>

  <h2>🧪 How It Works</h2>
  <div class="highlight">
    Users sign in with Google → JWT issued via NextAuth → Users can create/view/search prompts → Prompts stored in MongoDB → Users can explore profiles and copy prompts.
  </div>

  <h2>💻 Local Setup</h2>
  <ol>
    <li>Clone the repository:
      <pre>git clone https://github.com/blackcat-007/promptmania.git</pre>
    </li>
    <li>Install dependencies:
      <pre>npm install</pre>
    </li>
    <li>Create <code>.env.local</code> in root and add:
      <pre>
MONGODB_URI=your_mongo_uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
      </pre>
    </li>
    <li>Run the development server:
      <pre>npm run dev</pre>
    </li>
    <li>Visit: <code>http://localhost:3000</code></li>
  </ol>

  <h2>🔐 Authentication Overview</h2>
  <ul>
    <li>Google OAuth via <code>NextAuth</code></li>
    <li>Session tokens handled with JWT</li>
    <li>Secure cookie storage</li>
    <li>Protected pages for prompt creation/editing</li>
  </ul>

  <h2>📌 Future Enhancements</h2>
  <ul>
    <li>⭐ Bookmark or favorite prompts</li>
    <li>📥 Export prompt sets to JSON or text</li>
    <li>📊 Show trending prompts or contributors</li>
    <li>💬 Commenting and rating system</li>
    <li>📱 Mobile-first redesign for better UX</li>
  </ul>

  <h2>🙋‍♂️ Author</h2>
  <p>
    <strong>Shubho (blackcat-007)</strong><br>
    🧠 Fullstack Developer | ⚡ Django & React Dev<br>
    📫 <a href="https://github.com/blackcat-007" target="_blank">GitHub Profile</a>
  </p>

  <h2>📜 License</h2>
  <p>
    This project is released into the <strong>Public Domain</strong>.  
    You are free to use, modify, distribute, and adapt this code for any purpose without attribution or restrictions.
  </p>

  <blockquote>
    💬 “Prompting is the new coding. Share it. Reuse it. Rule it.” – PromptMania
  </blockquote>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
