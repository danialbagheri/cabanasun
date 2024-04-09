import {
  FaqTypes,
  ImageListTypes,
  KeywordTypes,
  QuestionTypes,
  RelatedProductTypes,
  ReviewTypes,
  ScoreChartTypes,
  SliderType,
  TagTypes,
  VariantType,
} from './types'

export type CollectionItemType = {
  item: {
    id: number | string
    variants: VariantType[]
    faq_list: FaqTypes[]
    tags: TagTypes[]
    main_image_data: ImageListTypes
    secondary_image_data: ImageListTypes
    lowest_variant_price: string
    main_image: string
    secondary_image: string
    main_image_resized: string
    main_image_webp: string
    secondary_image_resized: string
    secondary_image_webp: string
    types: string[]
    total_review_count: number
    review_average_score: number
    collection_names: string[]
    is_favorite: boolean
    plain_description: string
    questions: QuestionTypes[]
    reviews: ReviewTypes[]
    related_products: RelatedProductTypes[]
    score_chart: ScoreChartTypes
    updated: string
    name: string
    legacy_id: number
    graphql_id: string
    sub_title: string
    slug: string
    description: string
    direction_of_use: string
    is_public: boolean
    keyword: KeywordTypes[]
  }
}

export type CollectionType = {
  background_image_alt: string
  counts: number
  description: string
  id: number
  image: null | string
  items: CollectionItemType[]
  name?: string
  public: boolean
  slider: SliderType
  slug: string
  webp: null | string
}
