package core

type RoadieError struct {
	IsRoadieError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRoadieError(code string, msg string, ctx *Context) *RoadieError {
	return &RoadieError{
		IsRoadieError: true,
		Sdk:              "Roadie",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RoadieError) Error() string {
	return e.Msg
}
