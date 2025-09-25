
import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ThemeProvider } from './provider';
export const metadata={
   title:"Promptmania",
   description:"Discover and Share AI prompts",
   icons: {
    icon: '/assets/images/favicon-16x16.png', // path to your favicon
    shortcut: '/assets/images/favicon-16x16.png', // optional shortcut icon
    apple: '/assets/images/apple-touch-icon.png', // optional for iOS devices
  },
}
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
     
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
      <Provider>
        <div className='main'><div className='gradient'/></div>
        <main className="app">
            <Nav/>
            
          {children}        
      </main>
      </Provider>
      </ThemeProvider>
      </body>
      
      
    </html>
  )
}

export default RootLayout
