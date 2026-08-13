export interface Entity {
    api_version: string;
    entity_ref?: string;
    id: string;
    kind: string;
    metadata: Record<string, any>;
    raw_data?: Record<string, any>;
    relation?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
}
export interface EntityLoadMatch {
    id: string;
}
export interface EntityListMatch {
    api_version?: string;
    entity_ref?: string;
    id?: string;
    kind?: string;
    metadata?: Record<string, any>;
    raw_data?: Record<string, any>;
    relation?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
}
export interface EntityCreateData {
    api_version: string;
    entity_ref?: string;
    id: string;
    kind: string;
    metadata: Record<string, any>;
    raw_data?: Record<string, any>;
    relation?: any[];
    set?: string;
    source?: string;
    spec?: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
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
    item?: any[];
    set?: string;
}
export interface EntitySetPushUpdateData {
    set_id: string;
}
