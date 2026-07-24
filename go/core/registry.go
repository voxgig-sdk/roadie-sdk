package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEntityEntityFunc func(client *RoadieSDK, entopts map[string]any) RoadieEntity

var NewEntitySetEntityFunc func(client *RoadieSDK, entopts map[string]any) RoadieEntity

var NewEntitySetPushEntityFunc func(client *RoadieSDK, entopts map[string]any) RoadieEntity

