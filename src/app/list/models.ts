export class News {
    status?: string;
    userTier?: string;
    total?: number;
    startIndex?: number;
    pageSize?: number;
    currentPage?: number;
    pages?: number;
    orderBy?: string;
    results?: NewsObject[];
}
export class NewsObject {
    id?: string;
    type?: string;
    sectionId?: string;
    sectionName?: string;
    webPublicationDate?: string;
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    isHosted?: boolean;
    pillarId?: string;
    pillarName?: string;
}
export interface List<T> {
    [index: string]: T;
}