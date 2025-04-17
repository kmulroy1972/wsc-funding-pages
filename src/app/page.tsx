'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ... (keep your existing icon components) ...

interface SearchResult {
  id: string;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  type: string;
  description: string;
}

interface Appropriation {
  id: string;
  year: number;
  agency: string;
  subunit: string;
  subcommittee: string;
  account: string;
  budget_number: string;
  budget_function: string;
  recipient: string;
  amount: number;
  location: string;
  member: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All Funding');
  const [searchAnalysis, setSearchAnalysis] = useState<string | null>(null);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    setSearchAnalysis(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setError(null);
    setIsLoading(true);
    setSearchResults([]);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery.trim(),
          filterType: activeFilter,
        }),
      });

      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);
      console.log('Response status:', response.status);

      const text = await response.text();
      console.log('Response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || `Server error: ${response.status}`);
      }

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format');
      }

      setSearchResults(data.results);
      
      if (data.results.length === 0) {
        setError('No results found. Try different search terms.');
      }

    } catch (err) {
      console.error('Search error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while searching. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ... (keep your existing header JSX) ...

  return (
    <>
      {/* Keep your existing header */}
      
      <main>
        <section className="py-20 bg-gradient-to-br from-wsc-light to-[#e9ecef] text-center">
          <div className="wsc-container">
            <h1 className="text-5xl font-bold text-wsc-blue mb-5">
              Intelligent Federal Funding Search
            </h1>
            <p className="text-xl text-wsc-gray max-w-[700px] mx-auto mb-10">
              Access millions of federal funding opportunities using our advanced natural language search platform.
            </p>
            
            <div className="max-w-[800px] mx-auto wsc-card">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 border border-[#ddd] rounded-md text-base focus:outline-none focus:border-wsc-blue transition-colors duration-200"
                    placeholder="Ask about federal funding (e.g., 'Find grants for clean energy research')"
                    aria-label="Search funding opportunities"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="wsc-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </form>
              
              <div className="flex flex-col md:flex-row md:justify-between mt-5">
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {['All Funding', 'Grants', 'Contracts', 'Loans'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`py-1.5 px-3 rounded-full text-sm transition-colors duration-200 ${
                        activeFilter === filter
                          ? 'bg-wsc-blue text-white'
                          : 'bg-[#e9ecef] text-wsc-dark hover:bg-wsc-blue hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                <div className="text-wsc-blue font-medium cursor-pointer text-sm mt-4 md:mt-0">
                  Advanced Search Options
                </div>
              </div>
            </div>

            {/* Search Analysis */}
            {searchAnalysis && (
              <div className="mt-6 max-w-[800px] mx-auto text-left bg-blue-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-wsc-blue mb-2">Understanding your query:</h3>
                <p className="text-sm text-wsc-gray">{searchAnalysis}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 max-w-[800px] mx-auto text-left bg-red-50 p-4 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-8 max-w-[800px] mx-auto">
                <div className="grid gap-6">
                  {searchResults.map((result: Appropriation) => (
                    <div key={result.id} className="wsc-card text-left">
                      <h3 className="text-xl font-semibold text-wsc-blue mb-2">
                        {result.recipient}
                      </h3>
                      <p className="text-wsc-gray mb-4">{result.agency} - {result.subunit}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-wsc-gray">Amount:</span>
                          <p className="font-medium">{formatAmount(result.amount)}</p>
                        </div>
                        <div>
                          <span className="text-wsc-gray">Year:</span>
                          <p className="font-medium">{result.year}</p>
                        </div>
                        <div>
                          <span className="text-wsc-gray">Location:</span>
                          <p className="font-medium">{result.location}</p>
                        </div>
                        <div>
                          <span className="text-wsc-gray">Member:</span>
                          <p className="font-medium">{result.member}</p>
                        </div>
                        <div>
                          <span className="text-wsc-gray">Subcommittee:</span>
                          <p className="font-medium">{result.subcommittee}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {!isLoading && searchQuery && searchResults.length === 0 && !error && (
              <div className="mt-8 text-wsc-gray">
                No matching funding opportunities found. Try adjusting your search terms.
              </div>
            )}
          </div>
        </section>

        {/* Keep your existing sections */}
      </main>

      {/* Keep your existing footer */}
    </>
  );
} 