import { useState } from 'react';
import Head from 'next/head';

const CATEGORIES = [
  { id: 'compute', name: 'Compute', icon: '⚡', color: 'blue', subnets: ['SN64', 'SN62', 'SN56', 'SN51', 'SN27', 'SN12'] },
  { id: 'data', name: 'Data', icon: '📊', color: 'green', subnets: ['SN13', 'SN75', 'SN42', 'SN5', 'SN41', 'SN97', 'SN98'] },
  { id: 'inference', name: 'Inference', icon: '🧠', color: 'purple', subnets: ['SN19', 'SN1', 'SN37', 'SN63', 'SN65', 'SN66', 'SN67', 'SN68', 'SN70', 'SN71'] },
  { id: 'finance', name: 'Finance', icon: '💹', color: 'amber', subnets: ['SN50', 'SN15', 'SN76', 'SN8', 'SN127', 'SN41', 'SN30'] },
  { id: 'specialized', name: 'Specialized', icon: '🔧', color: 'slate', subnets: ['SN34', 'SN45', 'SN57', 'SN31', 'SN36', 'SN20', 'SN58', 'SN74', 'SN49', 'SN48'] },
];

const SUBNET_DETAILS: Record<string, { name: string; function: string; freeTier: string; keyUrl: string }> = {
  'SN64': { name: 'Chutes', function: 'GPU compute, inference', freeTier: '1000 req/day', keyUrl: 'https://chutes.ai/dashboard/api-keys' },
  'SN62': { name: 'Ridges', function: 'AI coding', freeTier: 'Via Chutes', keyUrl: 'https://chutes.ai/dashboard/api-keys' },
  'SN56': { name: 'Gradients', function: 'Model training', freeTier: 'Via Chutes', keyUrl: 'https://chutes.ai/dashboard/api-keys' },
  'SN13': { name: 'Data Universe', function: 'Data scraping', freeTier: '100 req/hour', keyUrl: 'https://macrocosmos.ai/data-universe/keys' },
  'SN19': { name: 'Nineteen', function: 'LLM inference', freeTier: 'Limited', keyUrl: 'https://nineteen.ai/dashboard' },
  'SN50': { name: 'Synth', function: 'Price forecasts', freeTier: 'Rate limited', keyUrl: 'https://synthdata.co/settings/keys' },
  'SN34': { name: 'Bitmind', function: 'Deepfake detection', freeTier: '500 req/month', keyUrl: 'https://bitmind.ai/dashboard/api-keys' },
  'SN51': { name: 'Lium', function: 'GPU rental', freeTier: 'None', keyUrl: 'https://lium.io/dashboard/keys' },
  'SN75': { name: 'Hippius', function: 'Storage', freeTier: '5GB', keyUrl: 'https://hippius.com/storage/keys' },
};

const KEY_URLS: Record<string, string> = {
  'SN64': 'https://chutes.ai/dashboard/api-keys',
  'SN62': 'https://chutes.ai/dashboard/api-keys',
  'SN56': 'https://chutes.ai/dashboard/api-keys',
  'SN13': 'https://macrocosmos.ai/data-universe/keys',
  'SN19': 'https://nineteen.ai/dashboard',
  'SN50': 'https://synthdata.co/settings/keys',
  'SN34': 'https://bitmind.ai/dashboard/api-keys',
  'SN51': 'https://lium.io/dashboard/keys',
  'SN75': 'https://hippius.com/storage/keys',
  'SN42': 'https://masa.ai/dashboard',
  'SN5': 'https://openkaito.ai/keys',
  'SN41': 'https://sportstensor.com/api',
  'SN15': 'https://bitquant.ai/keys',
  'SN76': 'https://taoshi.io/dashboard',
  'SN8': 'https://proprietary.trading/keys',
  'SN127': 'https://sigma.arena/keys',
  'SN57': 'https://gaia.weather/keys',
  'SN31': 'https://candles.ai/keys',
  'SN45': 'https://gen42.ai/settings/keys',
  'SN20': 'https://bitagent.ai/keys',
  'SN58': 'https://schelling.ai/keys',
  'default': 'https://bittensor.com/subnets',
};

export default function GLUE() {
  const [step, setStep] = useState<'categories' | 'subnets' | 'analysis' | 'keys' | 'executing' | 'result'>('categories');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubnets, setSelectedSubnets] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [userKeys, setUserKeys] = useState<Record<string, string>>({});
  const [userQuery, setUserQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSubnet = (id: string) => {
    setSelectedSubnets(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const analyzeCombination = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    const mockAnalysis = {
      feasible: true,
      summary: `Combination of ${selectedSubnets.length} subnets is feasible with optimizations available.`,
      issues: selectedSubnets.length > 3 ? [{
        type: 'optimization',
        description: 'Many subnets selected. Consider focusing on top 3 for cost efficiency.',
        suggestion: 'Remove lowest priority subnets'
      }] : [],
      cost: {
        free_tier_available: true,
        cost_per_request: '0.02',
        breakdown: selectedSubnets.map(sn => ({
          subnet: sn,
          cost: SUBNET_DETAILS[sn]?.freeTier?.includes('None') ? '$0.05' : '$0.00 (free tier)'
        }))
      },
      keys_required: selectedSubnets.map(sn => ({
        subnet: sn,
        service_name: SUBNET_DETAILS[sn]?.name || sn,
        purpose: SUBNET_DETAILS[sn]?.function || 'Bittensor subnet',
        free_tier: !SUBNET_DETAILS[sn]?.freeTier?.includes('None'),
        key_url: KEY_URLS[sn] || KEY_URLS.default,
        setup_time: '2-5 minutes'
      }))
    };
    
    setAnalysis(mockAnalysis);
    setStep('analysis');
    setLoading(false);
  };

  const execute = async () => {
    setLoading(true);
    setStep('executing');
    
    // Simulate execution
    await new Promise(r => setTimeout(r, 3000));
    
    const mockResult = {
      summary: `Successfully executed across ${selectedSubnets.length} subnets.`,
      execution_trace: selectedSubnets.map(sn => `${sn}: ${SUBNET_DETAILS[sn]?.name || sn} - Complete`),
      results: {
        data: 'Fetched and processed',
        compute: 'Deployed and executed',
        output: 'Unified result generated'
      },
      cost_breakdown: {
        total: selectedSubnets.length * 0.02,
        by_subnet: Object.fromEntries(selectedSubnets.map(sn => [sn, 0.02]))
      }
    };
    
    setResult(mockResult);
    setStep('result');
    setLoading(false);
  };

  const allKeysAdded = () => {
    return analysis?.keys_required?.every((k: any) => userKeys[k.subnet]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Head>
        <title>GLUE | Bittensor Subnet Orchestrator</title>
      </Head>

      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
              G
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">GLUE</h1>
              <p className="text-slate-400 text-xs">One prompt. All 129 subnets.</p>
            </div>
          </div>
          
          <div className="text-slate-400 text-sm">
            {step === 'categories' && 'Step 1: Select Categories'}
            {step === 'subnets' && 'Step 2: Choose Subnets'}
            {step === 'analysis' && 'Step 3: Review Analysis'}
            {step === 'keys' && 'Step 4: Add API Keys'}
            {step === 'executing' && 'Step 5: Executing...'}
            {step === 'result' && 'Complete'}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Step 1: Categories */}
        {step === 'categories' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                What would you like to build?
              </h2>
              <input
                type="text"
                placeholder="Describe your project..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full max-w-2xl bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-xl text-center placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <h3 className="text-xl font-semibold mb-6 text-center">Select Categories</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
                    selectedCategories.includes(cat.id)
                      ? `bg-${cat.color}-500/20 border-${cat.color}-500/50 shadow-lg shadow-${cat.color}-500/20`
                      : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <div className="font-bold text-lg mb-1">{cat.name}</div>
                  <div className="text-xs opacity-70">{cat.subnets.length} subnets</div>
                  
                  {selectedCategories.includes(cat.id) && (
                    <div className="absolute top-3 right-3 text-green-400 text-xl">✓</div>
                  )}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('subnets')}
                disabled={selectedCategories.length === 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/25"
              >
                Continue to Subnet Selection →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Subnets */}
        {step === 'subnets' && (
          <div>
            <button onClick={() => setStep('categories')} className="text-slate-400 hover:text-white mb-6">← Back to Categories</button>
            
            <h2 className="text-3xl font-bold mb-8">Select Specific Subnets</h2>
            
            {selectedCategories.map((catId) => {
              const cat = CATEGORIES.find(c => c.id === catId);
              return (
                <div key={catId} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>{cat?.icon}</span>
                    <span>{cat?.name}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat?.subnets.map((snId) => {
                      const details = SUBNET_DETAILS[snId] || { name: snId, function: 'Bittensor subnet', freeTier: 'Check docs' };
                      return (
                        <button
                          key={snId}
                          onClick={() => toggleSubnet(snId)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selectedSubnets.includes(snId)
                              ? 'bg-blue-600/20 border-blue-500/50'
                              : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold">{snId}</span>
                            {selectedSubnets.includes(snId) && <span className="text-green-400">✓</span>}
                          </div>
                          <div className="text-sm opacity-80 mb-1">{details.name}</div>
                          <div className="text-xs opacity-60">{details.function}</div>
                          <div className="text-xs text-green-400 mt-2">Free: {details.freeTier}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="text-center mt-8">
              <button
                onClick={analyzeCombination}
                disabled={selectedSubnets.length === 0 || loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                {loading ? 'Analyzing...' : `Analyze ${selectedSubnets.length} Subnets →`}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Analysis */}
        {step === 'analysis' && analysis && (
          <div>
            <button onClick={() => setStep('subnets')} className="text-slate-400 hover:text-white mb-6">← Back to Subnets</button>
            
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{analysis.feasible ? '✅' : '⚠️'}</span>
                <div>
                  <h2 className="text-2xl font-bold">{analysis.feasible ? 'Feasible' : 'Needs Attention'}</h2>
                  <p className="text-slate-400">{analysis.summary}</p>
                </div>
              </div>

              {analysis.issues?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-amber-400 font-semibold mb-3">Issues Found</h3>
                  {analysis.issues.map((issue: any, i: number) => (
                    <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-3">
                      <div className="font-medium text-amber-200">{issue.type}: {issue.description}</div>
                      <div className="text-slate-400 text-sm mt-1">Suggestion: {issue.suggestion}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-green-400 font-semibold mb-3">Cost Breakdown</h3>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span>Free tier available:</span>
                    <span className="text-green-400">{analysis.cost?.free_tier_available ? 'Yes' : 'Limited'}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Cost per request:</span>
                    <span className="text-green-400">${analysis.cost?.cost_per_request || '0.00'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('keys')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg"
              >
                Continue to API Key Setup →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Keys */}
        {step === 'keys' && analysis && (
          <div>
            <button onClick={() => setStep('analysis')} className="text-slate-400 hover:text-white mb-6">← Back to Analysis</button>
            
            <h2 className="text-3xl font-bold mb-6">API Key Setup</h2>
            <p className="text-slate-400 mb-8">Add your API keys to execute this combination. GLUE only uses these for your requests.</p>

            <div className="space-y-4 mb-8">
              {analysis.keys_required?.map((key: any, i: number) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg">{key.service_name}</div>
                      <div className="text-slate-400 text-sm">{key.purpose}</div>
                      <div className="text-green-400 text-xs mt-1">Free tier: {key.free_tier ? 'Yes' : 'No'}</div>
                    </div>
                    {userKeys[key.subnet] ? (
                      <span className="text-green-400 font-semibold">✓ Added</span>
                    ) : (
                      <span className="text-amber-400">Required</span>
                    )}
                  </div>

                  {!userKeys[key.subnet] && (
                    <div className="space-y-3">
                      <a
                        href={key.key_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Get {key.service_name} Key ↗
                      </a>
                      <input
                        type="password"
                        placeholder={`Paste ${key.service_name} key here`}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500"
                        onBlur={(e) => setUserKeys({...userKeys, [key.subnet]: e.target.value})}
                      />
                      <p className="text-slate-500 text-xs">Setup time: ~{key.setup_time}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={execute}
              disabled={!allKeysAdded() || loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold text-lg"
            >
              {loading ? 'Executing...' : allKeysAdded() ? 'Execute Combination' : 'Add All Keys to Execute'}
            </button>
          </div>
        )}

        {/* Step 5: Executing */}
        {step === 'executing' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 animate-pulse">⚡</div>
            <h2 className="text-3xl font-bold mb-4">Executing via BRAID</h2>
            <p className="text-slate-400">Orchestrating {selectedSubnets.length} subnets...</p>
            <div className="mt-8 max-w-md mx-auto bg-slate-800/40 rounded-2xl p-6">
              <div className="space-y-3 text-left">
                {selectedSubnets.map((sn, i) => (
                  <div key={sn} className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span>{sn}</span>
                    <span className="text-slate-500 text-sm ml-auto">Complete</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Result */}
        {step === 'result' && result && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Execution Complete</h2>
            
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Result</h3>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-300">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep('categories');
                  setSelectedCategories([]);
                  setSelectedSubnets([]);
                  setAnalysis(null);
                  setUserKeys({});
                  setResult(null);
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium"
              >
                Start New Project
              </button>
              <button
                onClick={() => setStep('keys')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium"
              >
                Run Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
