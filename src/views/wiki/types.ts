export type Paragraph = {
  title: string
  summary?: SummaryResponse
}

export type SectionProps = {
  title: string
  paragraphs: Paragraph[]
}

export type RelatedResponsePage = {
  title: string
}

export type RelatedResponse = {
  pages: RelatedResponsePage[]
}

export type SummaryResponse = {
  title: string
  thumbnail: {
    source: string
  }
  description: string
  extract: string
  content_urls: {
    desktop: {
      page: string
    }
  }
}

export type SearchResponse = {
  query: {
    search: {
      ns: number
      title: string
      pageid: number
      size: number
      wordcount: number
      snippet: string
      timestamp: Date
    }[]
  }
}
