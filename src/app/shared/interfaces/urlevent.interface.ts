export interface UrlEvent {
    eventId: string,
    userId: string,
    eventType: string,
    shortUrlHash: string,
    originalUrl: string,
    timestamp: number
}