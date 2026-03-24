import React, { useState } from 'react'
import { Code2, Send, Loader2, Copy, Check, Terminal, Sparkles, MessageSquare, Bug, Refactor, BookOpen } from 'lucide-react'

const codeExamples = {
  python: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# 测试
print(quicksort([3, 6, 8, 10, 1, 2, 1]))`,
  javascript: `function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);`,
  react: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
}

const quickActions = [
  { icon: Bug, label: '代码审查', desc: '找出潜在bug' },
  { icon: Refactor, label: '代码重构', desc: '优化代码结构' },
  { icon: BookOpen, label: '代码解释', desc: '解释代码逻辑' },
  { icon: MessageSquare, label: '写注释', desc: '添加文档注释' },
]

function App() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [copied, setCopied] = useState(false)

  const analyzeCode = async () => {
    if (!code.trim()) return
    setIsAnalyzing(true)
    await new Promise(r => setTimeout(r, 1500))
    
    const langMap = { python: 'Python', javascript: 'JavaScript', react: 'React' }
    const responses = {
      python: '✅ 代码结构清晰\n\n📊 复杂度: O(n log n)\n\n💡 建议:\n• 可以添加类型提示\n• 考虑使用随机基准避免最坏情况\n• 空间复杂度可优化',
      javascript: '✅ 防抖函数实现正确\n\n📊 关键点:\n• 使用闭包保存 timer 状态\n• 支持 this 上下文\n• 可中断定时器\n\n💡 建议:\n• 可添加取消功能\n• 支持返回值清理',
      react: '✅ 自定义 Hook 设计良好\n\n📊 功能:\n• 延迟值更新\n• 自动清理定时器\n\n💡 建议:\n• 可添加取消请求支持\n• 支持 Promise 版本',
    }
    setAnalysis(responses[language] || '分析完成')
    setIsAnalyzing(false)
  }

  const loadExample = () => {
    setCode(codeExamples[language])
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Code Assist</h1>
                <p className="text-sm text-white/50">智能编程助手</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/70">在线</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <button key={i} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all hover:-translate-y-1">
              <action.icon className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="font-medium">{action.label}</div>
              <div className="text-sm text-white/50">{action.desc}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Input */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">代码输入</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/10 px-3 py-1 rounded-lg text-sm outline-none cursor-pointer"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
                </select>
                <button onClick={loadExample} className="px-3 py-1 bg-white/10 rounded-lg text-sm hover:bg-white/20">
                  示例
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="粘贴或输入代码..."
              className="w-full h-80 p-4 bg-transparent resize-none outline-none editor-textarea text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <button onClick={copyCode} className="flex items-center gap-2 text-white/50 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? '已复制' : '复制'}</span>
              </button>
              <button
                onClick={analyzeCode}
                disabled={!code.trim() || isAnalyzing}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 px-6 py-2 rounded-xl font-medium transition-colors"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isAnalyzing ? '分析中...' : '开始分析'}
              </button>
            </div>
          </div>

          {/* Analysis Result */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">分析结果</span>
            </div>
            <div className="p-6 h-80 overflow-auto">
              {analysis ? (
                <div className="space-y-4">
                  {analysis.split('\n').map((line, i) => {
                    if (line.startsWith('✅')) return <div key={i} className="text-emerald-400 font-medium">{line}</div>
                    if (line.startsWith('📊')) return <div key={i} className="text-blue-400 font-medium">{line}</div>
                    if (line.startsWith('💡')) return <div key={i} className="text-yellow-400 font-medium">{line}</div>
                    if (line.startsWith('•')) return <div key={i} className="text-white/70 pl-4">• {line.slice(1)}</div>
                    return <div key={i} className="text-white/70">{line}</div>
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <Code2 className="w-16 h-16 mb-4 opacity-20" />
                  <p>输入代码开始分析</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
