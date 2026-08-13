import { RoadieEntityBase } from '../RoadieEntityBase';
import type { RoadieSDK } from '../RoadieSDK';
import type { Control } from '../types';
import type { Entity, EntityLoadMatch, EntityListMatch, EntityCreateData, EntityRemoveMatch } from '../RoadieTypes';
declare class EntityEntity extends RoadieEntityBase<Entity> {
    constructor(client: RoadieSDK, entopts: any);
    make(this: EntityEntity): EntityEntity;
    load(this: any, reqmatch?: EntityLoadMatch, ctrl?: Control): Promise<Entity>;
    list(this: any, reqmatch?: EntityListMatch, ctrl?: Control): Promise<Entity[]>;
    create(this: any, reqdata?: EntityCreateData, ctrl?: Control): Promise<Entity>;
    remove(this: any, reqmatch?: EntityRemoveMatch, ctrl?: Control): Promise<Entity>;
}
export { EntityEntity };
