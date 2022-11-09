package common

import "encoding/json"

// JSON parse response
func JSON(r interface{}) string {
	j, err := json.Marshal(r)
	if err != nil {
		return err.Error()
	}

	return string(j)
}
