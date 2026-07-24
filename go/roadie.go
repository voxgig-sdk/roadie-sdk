package voxgigroadiesdk

import (
	"github.com/voxgig-sdk/roadie-sdk/go/core"
	"github.com/voxgig-sdk/roadie-sdk/go/entity"
	"github.com/voxgig-sdk/roadie-sdk/go/feature"
	_ "github.com/voxgig-sdk/roadie-sdk/go/utility"
)

// Type aliases preserve external API.
type RoadieSDK = core.RoadieSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RoadieEntity = core.RoadieEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RoadieError = core.RoadieError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEntityEntityFunc = func(client *core.RoadieSDK, entopts map[string]any) core.RoadieEntity {
		return entity.NewEntityEntity(client, entopts)
	}
	core.NewEntitySetEntityFunc = func(client *core.RoadieSDK, entopts map[string]any) core.RoadieEntity {
		return entity.NewEntitySetEntity(client, entopts)
	}
	core.NewEntitySetPushEntityFunc = func(client *core.RoadieSDK, entopts map[string]any) core.RoadieEntity {
		return entity.NewEntitySetPushEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRoadieSDK = core.NewRoadieSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewRoadieSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *RoadieSDK  { return NewRoadieSDK(nil) }
func Test() *RoadieSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
