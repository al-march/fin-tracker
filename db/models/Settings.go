package models

type Settings struct {
	ID     uint `json:"-"`
	UserID uint `json:"-"`

	MonthIncome  float32 `json:"monthIncome"`
	MonthOutcome float32 `json:"monthOutcome"`
}
