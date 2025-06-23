import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Hash, MessageCircle, Mail, Tag, Lightbulb, Send, Loader2 } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [generatedContent, setGeneratedContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const contentTypes = [
    {
      id: 'blog',
      icon: FileText,
      title: 'Blog Post',
      description: 'Generate engaging blog articles and posts',
      color: 'blue'
    },
    {
      id: 'tweet',
      icon: Hash,
      title: 'Tweet',
      description: 'Create compelling tweets and social posts',
      color: 'blue'
    },
    {
      id: 'comment',
      icon: MessageCircle,
      title: 'Comment',
      description: 'Generate thoughtful comments and replies',
      color: 'green'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      description: 'Craft professional emails and messages',
      color: 'purple'
    },
    {
      id: 'tag',
      icon: Tag,
      title: 'Tag',
      description: 'Create relevant tags and hashtags',
      color: 'orange'
    },
    {
      id: 'idea',
      icon: Lightbulb,
      title: 'Idea',
      description: 'Generate creative ideas and concepts',
      color: 'yellow'
    }
  ]

  const generateContent = async (prompt, type = 'blog') => {
    setIsLoading(true)
    setError('')
    setSelectedType(type)

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          type: typeof type === 'object' ? type.id : type,
          maxTokens: 1000
        })
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
      } else {
        setError(data.message || 'Failed to generate content')
      }
    } catch (err) {
      setError('Failed to connect to the server. Make sure the backend is running.')
      console.error('Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = (type) => {
    if (!inputValue.trim()) {
      setError('Please enter a prompt first')
      return
    }
    generateContent(inputValue, type)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      generateContent(inputValue, 'blog')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ContentAI</h1>
          </div>
          <p className="text-lg text-gray-600">Generate beautiful content with the power of AI</p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe what you want to create... (e.g., 'Write a blog post about sustainable living' or 'Create a tweet about morning productivity tips')"
              className="w-full h-32 px-6 py-4 text-gray-700 bg-white border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute bottom-4 right-4 w-12 h-12 bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors duration-200"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </form>
        </motion.div>

        {/* Content Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">Or choose a content type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((type, index) => {
              const IconComponent = type.icon
              const colorClasses = {
                blue: 'text-blue-500 bg-blue-50 hover:bg-blue-100',
                green: 'text-green-500 bg-green-50 hover:bg-green-100',
                purple: 'text-purple-500 bg-purple-50 hover:bg-purple-100',
                orange: 'text-orange-500 bg-orange-50 hover:bg-orange-100',
                yellow: 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
              }

              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => handleGenerate(type)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[type.color]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <button className="text-gray-400 text-sm flex items-center hover:text-gray-600 transition-colors disabled:cursor-not-allowed">
                    {isLoading && selectedType?.id === type.id ? 'Generating...' : 'Click to generate'}
                    <div className="ml-2 w-4 h-4 flex items-center justify-center">
                      {isLoading && selectedType?.id === type.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
          >
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Generated Content Display */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {selectedType?.title || 'Content'}
              </span>
            </div>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {generatedContent}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App