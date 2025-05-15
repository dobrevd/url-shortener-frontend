export interface UrlEvent {
    eventId: string,
    userId: number,
    eventType: string,
    shortUrlHash: string,
    originalUrl: string,
    timestamp: number
}