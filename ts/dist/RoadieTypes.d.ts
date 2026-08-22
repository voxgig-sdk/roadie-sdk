export interface Entity {
    apiVersion: string;
    entityRef?: string;
    id: string;
    kind: string;
    metadata: Record<string, any>;
    rawData?: Record<string, any>;
    relations?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updatedAt?: string;
    updatedBy?: string;
}
export interface EntityLoadMatch {
    id: string;
}
export interface EntityListMatch {
    apiVersion?: string;
    entityRef?: string;
    id?: string;
    kind?: string;
    metadata?: Record<string, any>;
    rawData?: Record<string, any>;
    relations?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updatedAt?: string;
    updatedBy?: string;
}
export interface EntityCreateData {
    apiVersion: string;
    entityRef?: string;
    id: string;
    kind: string;
    metadata: Record<string, any>;
    rawData?: Record<string, any>;
    relations?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updatedAt?: string;
    updatedBy?: string;
}
export interface EntityRemoveMatch {
    id: string;
}
export interface EntitySet {
    name?: string;
}
export interface EntitySetListMatch {
    name?: string;
}
export interface EntitySetPush {
    items?: any[];
    set?: string;
}
export interface EntitySetPushUpdateData {
    set_id: string;
    items?: any[];
    set?: string;
}
