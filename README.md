<h1 align="center">
  <img 
    src="https://res.cloudinary.com/ddcdrrav8/image/upload/v1758786565/Screenshot_2025-09-25_131603-Picsart-AiImageEnhancer_w6gdy8.png" 
    alt="🧠 PromptMania" 
    width="320"
  >
  <br>
  🧠 PromptMania
</h1>

<p align="center">
  <em>A community-driven hub for sharing, storing, and discovering the most powerful AI prompts ✨</em>
</p>

<p align="center">
  <a href="https://github.com/blackcat-007/promptmania" target="_blank">🌐 GitHub Repo</a> • 
  <a href="https://nextjs.org/" target="_blank">⚡ Built with Next.js</a> • 
  <a href="https://vercel.com/" target="_blank">🚀 Deploy on Vercel</a>
</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>📌 Post and save <strong>ChatGPT, Gemini, Perplexity, Grok</strong> prompts</li>
  <li>💡 Explore trending prompts for videos, social posts, and project work</li>
  <li>🔍 Full-text search by <strong>tag, keyword, or author</strong></li>
  <li>✂️ One-click copy to clipboard</li>
  <li>👤 Personalized profile page with your saved prompts</li>
  <li>🔐 Secure Google OAuth authentication with <code>NextAuth.js</code></li>
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
  📦 Stored in MongoDB → 🌍 Explore trending prompts & profiles → ⚡ Copy prompts instantly.
</p>

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
