package types


type Event struct {
	Operation string  `json:"operation"`
	TableName string  `json:"tableName"`
	Payload   Data     `json:"payload"`
}

type Data struct {
	Item         `json:"item"`
}

type Item struct {
	ID   string  `json:"id"`
	Name string  `json:"name"`
}
