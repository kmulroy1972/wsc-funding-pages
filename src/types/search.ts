export interface SearchResult {
  id: string;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  type: string;
  description: string;
}

export interface SearchRequest {
  query: string;
  filterType: string;
} 