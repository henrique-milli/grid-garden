export type Response = {
    results: Array<{
        hits: Array<{
            isBrush: boolean
            isBrushPreset: boolean
            organizationIds?: Array<string>
            isOrgIcon: boolean
            _id: string
            slug: string
            name: string
            relatedIconRequests: Array<string>
            duplicateAssetOnSave?: boolean
            isComplexAsset?: boolean
            createdAt: string
            available: boolean
            articleIconsSection?: Array<any>
            studyFields: Array<any>
            synonyms: Array<string>
            tags: Array<string>
            isNotFirefoxCompatible: boolean
            isPublished: boolean
            _categories: Array<string>
            paidColors: any
            assetType: string
            __v: number
            altTextMarketingSite: string
            alternativeNames: string
            displayName: string
            iconMarketingSiteBlurb: string
            image: {
                imageFormatVersion: string
                url: string
                version: any
                width: number
                height: number
            }
            pageDescription: string
            pageTitle: string
            widthOnDrag?: number
            newIconVersion?: string
            illustrator: Array<string>
            tagInput?: string
            isPremium: boolean
            premiumContentCategory: string
            fullName: string
            exactName: string
            iconSlugPaths: Array<Array<string>>
            categories: Array<string>
            hierarchicalCategories: {
                lvl0: Array<string>
                lvl1: Array<string>
            }
            hasColors?: boolean
            parentCategoryTags: Array<string>
            categoryTags: Array<string>
            parentStudyFields: Array<string>
            categoryStudyFields: Array<string>
            subCategories: Array<string>
            parentCategories: Array<string>
            orgCategoryNames: Array<string>
            objectID: string
            thumbnailImage?: {
                asset_id?: string
                public_id?: string
                version?: number
                version_id?: string
                signature?: string
                width?: number
                height?: number
                format?: string
                resource_type?: string
                created_at?: string
                tags?: Array<any>
                bytes?: number
                type?: string
                etag?: string
                placeholder?: boolean
                url?: string
                secure_url?: string
                folder?: string
                api_key?: string
            }
            jsonFile?: {
                source?: string
                bucket?: string
                key?: string
                filename?: string
                etag?: string
                url?: string
            }
            otherColors: any
            assetJSON: any
        }>
        nbHits: number
        page: number
        nbPages: number
        hitsPerPage: number
        exhaustiveNbHits: boolean
        exhaustiveTypo: boolean
        exhaustive: {
            nbHits: boolean
            typo: boolean
        }
        query: string
        params: string
        index: string
        processingTimeMS: number
        processingTimingsMS: {
            _request: {
                roundTrip: number
            }
            afterFetch: {
                format: {
                    total: number
                }
            }
            fetch: {
                total: number
            }
            getIdx: {
                load: {
                    total: number
                }
                total: number
            }
            total: number
        }
        serverTimeMS: number
    }>
}
