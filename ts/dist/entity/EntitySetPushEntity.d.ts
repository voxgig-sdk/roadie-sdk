import { RoadieEntityBase } from '../RoadieEntityBase';
import type { RoadieSDK } from '../RoadieSDK';
import type { Control } from '../types';
import type { EntitySetPush, EntitySetPushUpdateData } from '../RoadieTypes';
declare class EntitySetPushEntity extends RoadieEntityBase<EntitySetPush> {
    constructor(client: RoadieSDK, entopts: any);
    make(this: EntitySetPushEntity): EntitySetPushEntity;
    update(this: any, reqdata?: EntitySetPushUpdateData, ctrl?: Control): Promise<EntitySetPush>;
}
export { EntitySetPushEntity };
