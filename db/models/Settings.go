package models

type Settings struct {
	UserID uint `json:"userId"`

	MonthIncome  float32 `json:"monthIncome"`
	MonthOutcome float32 `json:"monthOutcome"`
}
