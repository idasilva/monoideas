package types

// Event represents a event
type Event struct {
	Event string `json:"event"`
	Request interface{}
	Response interface{}
}
