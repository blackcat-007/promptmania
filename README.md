<h1 align="center">
  <img 
    src="https://res.cloudinary.com/ddcdrrav8/image/upload/v1758786565/Screenshot_2025-09-25_131603-Picsart-AiImageEnhancer_w6gdy8.png" 
    alt="🧠 PromptMania" 
    width="320"
  >
  <br>
  
</h1>

<p align="center">
  <em>🎉 Explore trending AI prompts, save your favorites, and have fun generating images, videos, and more! 🚀</em>
</p>

<p align="center">
  <!-- Tech & feature badges -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Badge">
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextauth.js&logoColor=white" alt="NextAuth Badge">
  <img src="https://img.shields.io/badge/Trending_Prompts-ff69b4?style=for-the-badge" alt="Trending Prompts Badge">
  <img src="https://img.shields.io/badge/Save_Your_Prompts-1E90FF?style=for-the-badge" alt="Save Your Prompts Badge">
  <img src="https://img.shields.io/badge/🎨_Fun_with_AI-Fuchsia?style=for-the-badge" alt="Fun with AI Badge">
</p>

<p align="center">
  <a href="https://github.com/blackcat-007/promptmania" target="_blank">🌐 GitHub Repo</a>
</p>

<hr>

<h2>🚀 What You Can Do with PromptMania</h2>
<ul>
  <li>📌 Discover and post trending AI prompts</li>
  <li>💾 Save your favorite prompts for easy access</li>
  <li>🎨 Use prompts to generate images, videos, music, or social media content</li>
  <li>🔍 Search by keyword, tag, or author</li>
  <li>✂️ Copy any prompt with one click</li>
  <li>👤 Personal profile page to manage your creations</li>
  <li>🔐 Secure Google OAuth login via NextAuth.js</li>
</ul>

<h2>🧰 Tech Stack</h2>
<table>
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
      <td><strong>Next.js (App Router)</strong></td>
      <td>Modern React framework with SSR & routing</td>
    </tr>
    <tr>
      <td>Styling</td>
      <td><strong>Tailwind CSS</strong></td>
      <td>Utility-first responsive styling</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td><strong>NextAuth + Google OAuth + JWT</strong></td>
      <td>Secure login with token-based sessions</td>
    </tr>
    <tr>
      <td>Database</td>
      <td><strong>MongoDB Atlas</strong></td>
      <td>NoSQL DB for storing prompts and users</td>
    </tr>
    <tr>
      <td>ORM</td>
      <td><strong>Mongoose</strong></td>
      <td>Elegant object modeling for MongoDB</td>
    </tr>
  </tbody>
</table>

<h2>🗂 Project Structure</h2>
<pre>
promptmania/
├── app/
│   ├── page.tsx                 # Landing/Home page
│   ├── profile/                 # User profile view
│   ├── prompt/[id]/             # Individual prompt details
│   ├── create-prompt/           # Create new prompt page
│   └── api/                     # API routes (Next.js)
├── components/                  # Reusable UI components
├── lib/                         # Database helpers & config
├── models/                      # Mongoose models (User, Prompt)
├── public/                      # Static assets
└── README.md                    # This file
</pre>

<h2>🧪 How It Works</h2>
<p>
  🔑 Sign in with Google → ✅ Session issued via JWT → 📝 Create, update, and save prompts → 
  📦 Stored in MongoDB → 🌍 Explore trending prompts → 🎨 Generate fun images, videos, and content → ⚡ Copy prompts instantly.
</p>

<h2>💻 Local Setup</h2>
<ol>
  <li>Clone the repository:
    <pre>git clone https://github.com/blackcat-007/promptmania.git</pre>
  </li>
  <li>Install dependencies:
    <pre>npm install</pre>
  </li>
  <li>Create <code>.env.local</code> in root and add placeholders:
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
  <li>Visit: <a href="http://localhost:3000">http://localhost:3000</a></li>
</ol>

<h2>🔐 Authentication Flow</h2>
<ul>
  <li>Google OAuth login via <code>NextAuth</code></li>
  <li>JWT-based secure sessions</li>
  <li>Protected routes for prompt creation & editing</li>
</ul>

<h2>📌 Future Enhancements</h2>
<ul>
  <li>⭐ Bookmark/favorite prompts</li>
  <li>📥 Export prompt sets (JSON / TXT)</li>
  <li>📊 Trending prompts & top contributors</li>
  <li>💬 Commenting & rating system</li>
  <li>📱 Mobile-first redesign</li>
  <li>🎮 Fun interactive AI games using prompts</li>
</ul>

<h2>🙋‍♂️ Author</h2>
<p>
  <strong>Shubho (blackcat-007)</strong><br>
  🧠 Fullstack Developer | ⚡ Django & React Enthusiast<br>
  📫 <a href="https://github.com/blackcat-007" target="_blank">GitHub Profile</a>
</p>

<h2>📜 License</h2>
<p>
  This project is released into the <strong>Public Domain</strong>.  
  You are free to use, modify, and distribute this code without restrictions.
</p>

<blockquote align="center">
  💬 “Prompting is the new coding. Share it. Reuse it. Rule it.” – PromptMania
</blockquote>

<hr>

<h3>🚀 Quick Start (Next.js)</h3>
<pre>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
</pre>

<p>
Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the app in action 🎉
</p>

<h2>📚 Learn More</h2>
<ul>
  <li><a href="https://nextjs.org/docs" target="_blank">Next.js Documentation</a></li>
  <li><a href="https://nextjs.org/learn" target="_blank">Interactive Next.js Tutorial</a></li>
  <li><a href="https://github.com/vercel/next.js/" target="_blank">Next.js GitHub Repository</a></li>
</ul>
