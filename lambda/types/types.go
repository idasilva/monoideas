package types

type Event struct {
	Operation string `json:"operation"`
	TableName string `json:"tableName"`
	ID        string    `json:"id"`
	Name      string `json:"name"`
}
