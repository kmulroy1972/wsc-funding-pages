import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface QueryAnalysis {
  searchTerm: string;
  filters: {
    location?: string;
    year?: number;
    agency?: string;
    minAmount?: number;
    maxAmount?: number;
    recipient?: string;
    member?: string;
  };
}

export async function analyzeQuery(query: string): Promise<QueryAnalysis> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that analyzes search queries for a funding database. 
          Extract the main search term and any filters (location, year, agency, amount range, recipient, member) from the query.
          Return the analysis in JSON format with the following structure:
          {
            "searchTerm": "main search term",
            "filters": {
              "location": "state or city if mentioned",
              "year": year if mentioned,
              "agency": "agency name if mentioned",
              "minAmount": minimum amount if mentioned,
              "maxAmount": maximum amount if mentioned,
              "recipient": "recipient name if mentioned",
              "member": "member name if mentioned"
            }
          }`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    // Parse the response and extract the analysis
    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    try {
      // Parse the JSON response
      const parsedResponse = JSON.parse(response);
      return parsedResponse as QueryAnalysis;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      // Fallback to basic parsing if JSON parsing fails
      const analysis: QueryAnalysis = {
        searchTerm: query,
        filters: {}
      };

      // Extract location (state abbreviations or city names)
      const locationMatch = query.match(/\b(NY|CA|TX|FL|IL|PA|OH|GA|NC|MI|NJ|VA|WA|AZ|MA|IN|TN|MO|MD|WI|CO|MN|SC|AL|LA|KY|OR|OK|CT|IA|MS|AR|KS|UT|NV|NM|NE|WV|ID|HI|ME|NH|RI|MT|DE|SD|AK|ND|VT|WY)\b/i);
      if (locationMatch) {
        analysis.filters.location = locationMatch[1].toUpperCase();
      }

      // Extract year
      const yearMatch = query.match(/\b(20\d{2})\b/);
      if (yearMatch) {
        analysis.filters.year = parseInt(yearMatch[1]);
      }

      // Extract agency names
      const agencies = ['Department of Labor', 'Department of Education', 'Department of Health', 'Department of Defense'];
      for (const agency of agencies) {
        if (query.toLowerCase().includes(agency.toLowerCase())) {
          analysis.filters.agency = agency;
          break;
        }
      }

      // Extract amount ranges
      const amountMatch = query.match(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:million|billion)?/i);
      if (amountMatch) {
        const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
        if (query.toLowerCase().includes('over') || query.toLowerCase().includes('more than')) {
          analysis.filters.minAmount = amount;
        } else if (query.toLowerCase().includes('under') || query.toLowerCase().includes('less than')) {
          analysis.filters.maxAmount = amount;
        }
      }

      return analysis;
    }
  } catch (error) {
    console.error('Error analyzing query:', error);
    // Return a default analysis in case of error
    return {
      searchTerm: query,
      filters: {}
    };
  }
} 