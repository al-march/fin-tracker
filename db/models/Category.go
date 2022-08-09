package models

type Category struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

var CategoryList = []Category{
	{ID: 1, Name: "food"},
	{ID: 2, Name: "transport"},
	{ID: 3, Name: "home"},
	{ID: 4, Name: "fun"},
	{ID: 5, Name: "health"},
	{ID: 6, Name: "rent"},
	{ID: 7, Name: "subscription"},
	{ID: 8, Name: "restaurant"},
	{ID: 9, Name: "credit"},
	{ID: 10, Name: "other"},
}
