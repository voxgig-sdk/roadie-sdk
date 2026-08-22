import { RoadieEntityBase } from '../RoadieEntityBase';
import type { RoadieSDK } from '../RoadieSDK';
import type { Control } from '../types';
import type { EntitySet, EntitySetListMatch } from '../RoadieTypes';
declare class EntitySetEntity extends RoadieEntityBase<EntitySet> {
    constructor(client: RoadieSDK, entopts: any);
    make(this: EntitySetEntity): EntitySetEntity;
    list(this: any, reqmatch?: EntitySetListMatch, ctrl?: Control): Promise<EntitySetEntity[]>;
}
export { EntitySetEntity };
